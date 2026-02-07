class WeatherApp {
    constructor() {
        this.api = new WeatherAPI();
        this.ciudades = ciudadesConfig;
        this.contenedor = document.getElementById('contenedor-clima');
        this.contenedorDetalle = document.getElementById('pronostico-semanal');
        this.contenedorStats = document.getElementById('contenedor-estadisticas');
        this.contenedorAlertas = document.getElementById('contenedor-alertas');
    }

    async initHome() {
        if (!this.contenedor) return;
        
        this.contenedor.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div><p>Cargando datos en vivo...</p></div>';

        try {
            const promesas = this.ciudades.map(async (ciudad) => {
                const data = await this.api.getWeather(ciudad.lat, ciudad.lon);
                const infoClima = interpretarCodigoClima(data.current.weather_code);
                
                return {
                    ...ciudad,
                    tempActual: Math.round(data.current.temperature_2m),
                    estado: infoClima.texto,
                    iconoClima: infoClima.icono
                };
            });

            const resultados = await Promise.all(promesas);
            this.renderHome(resultados);

        } catch (error) {
            this.contenedor.innerHTML = `<div class="alert alert-danger">Error al cargar el clima. Verifica tu conexión.</div>`;
        }
    }

    renderHome(lugares) {
        this.contenedor.innerHTML = lugares.map(lugar => `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="place-card">
                    <div class="place-card__body">
                        <div class="place-card__icon">${lugar.iconoClima}</div>
                        <h2 class="place-card__title">${lugar.imagen} ${lugar.nombre}</h2>
                        <div class="place-card__temp">${lugar.tempActual}°C</div>
                        <p class="place-card__desc">${lugar.estado}</p>
                        <button class="btn btn-outline-primary place-card__action" onclick="window.app.irADetalle(${lugar.id})">
                            Ver Detalle
                        </button>
                    </div>
                </article>
            </div>
        `).join('');
    }

    irADetalle(id) {
        localStorage.setItem('ciudadSeleccionada', id);
        window.location.href = 'detalle.html';
    }

    async initDetalle() {
        const id = localStorage.getItem('ciudadSeleccionada');
        if (!id) window.location.href = 'index.html';

        const ciudad = this.ciudades.find(c => c.id == id);
        if (!ciudad) window.location.href = 'index.html';

        document.getElementById('nombre-ciudad').textContent = `${ciudad.imagen} ${ciudad.nombre}`;

        if(this.contenedorDetalle) this.contenedorDetalle.innerHTML = '<div class="spinner-border text-primary"></div> Cargando pronóstico...';

        try {
            const data = await this.api.getWeather(ciudad.lat, ciudad.lon);
            const pronosticoFormateado = this.procesarPronostico(data.daily);
            
            this.renderPronostico(pronosticoFormateado);
            this.renderEstadisticas(pronosticoFormateado);
            this.renderAlertas(pronosticoFormateado);

        } catch (error) {
            if(this.contenedorDetalle) this.contenedorDetalle.innerHTML = '<div class="alert alert-danger">No se pudo cargar el pronóstico.</div>';
        }
    }

    procesarPronostico(daily) {
        return daily.time.map((fecha, index) => {
            const info = interpretarCodigoClima(daily.weather_code[index]);
            return {
                dia: new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long' }),
                min: Math.round(daily.temperature_2m_min[index]),
                max: Math.round(daily.temperature_2m_max[index]),
                estado: info.texto,
                icono: info.icono
            };
        });
    }

    renderPronostico(dias) {
        if (!this.contenedorDetalle) return;
        this.contenedorDetalle.innerHTML = dias.map(dia => `
            <div class="col-6 col-md-4 col-lg-3">
                <article class="forecast-card h-100 p-3 border rounded text-center bg-white shadow-sm">
                    <h5 class="fw-bold text-capitalize">${dia.dia}</h5>
                    <div class="display-6 my-2">${dia.icono}</div>
                    <p class="text-capitalize text-muted mb-2">${dia.estado}</p>
                    <div class="d-flex justify-content-center gap-2">
                        <span class="fw-bold text-danger">${dia.max}°</span> 
                        <span class="fw-bold text-primary">${dia.min}°</span>
                    </div>
                </article>
            </div>
        `).join('');
    }

    renderEstadisticas(dias) {
        if (!this.contenedorStats) return;

        let suma = 0, min = dias[0].min, max = dias[0].max;
        let soleados = 0, lluviosos = 0;

        dias.forEach(d => {
            suma += (d.min + d.max) / 2;
            if (d.min < min) min = d.min;
            if (d.max > max) max = d.max;
            if (d.estado === 'Despejado' || d.estado === 'Nublado') soleados++;
            if (d.estado.includes('Lluvia') || d.estado.includes('Tormenta') || d.estado.includes('Chubascos')) lluviosos++;
        });

        const promedio = (suma / dias.length).toFixed(1);

        this.contenedorStats.innerHTML = `
            <div class="col-md-4">
                <div class="card p-3 mb-2 shadow-sm border-0 bg-light">
                    <h5 class="text-primary">🌡️ Temperaturas</h5>
                    <p>Min: <strong>${min}°C</strong> | Max: <strong>${max}°C</strong></p>
                    <p>Promedio: <strong>${promedio}°C</strong></p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card p-3 h-100 shadow-sm border-0 bg-light">
                    <h5 class="text-primary">📊 Resumen</h5>
                    <p>Días secos: ${soleados} | Días húmedos: ${lluviosos}</p>
                    <p class="text-muted small">Datos calculados en base a Open-Meteo API.</p>
                </div>
            </div>
        `;
    }

    renderAlertas(dias) {
        if (!this.contenedorAlertas) return;

        const hayLluvia = dias.some(d => d.estado.includes('Lluvia') || d.estado.includes('Tormenta'));
        const calorExtremo = dias.some(d => d.max > 32);
        const frioExtremo = dias.some(d => d.min < 5);

        let alertasHTML = '';

        if (calorExtremo) {
            alertasHTML += `<div class="alert alert-warning">🔥 <strong>Alerta de Calor:</strong> Se esperan temperaturas superiores a 32°C.</div>`;
        }
        if (frioExtremo) {
            alertasHTML += `<div class="alert alert-info">❄️ <strong>Alerta de Frío:</strong> Abrígate, las temperaturas bajarán de 5°C.</div>`;
        }
        if (hayLluvia) {
            alertasHTML += `<div class="alert alert-primary">☔ <strong>Alerta de Lluvia:</strong> Se pronostican lluvias en la semana.</div>`;
        }
        
        if (alertasHTML === '') {
            alertasHTML = `<div class="alert alert-success">✅ <strong>Sin Alertas:</strong> Condiciones climáticas normales.</div>`;
        }

        this.contenedorAlertas.innerHTML = alertasHTML;
    }
}