document.addEventListener('DOMContentLoaded', () => {
    
    const idCiudad = localStorage.getItem('ciudadSeleccionada');
    if (!idCiudad) {
        window.location.href = 'index.html';
        return;
    }

    const lugar = obtenerLugarPorId(idCiudad);

    if (!lugar) {
        window.location.href = 'index.html';
        return;
    }

    const tituloEl = document.getElementById('nombre-ciudad');
    if (tituloEl) tituloEl.textContent = `${lugar.imagen} ${lugar.nombre}`;

    const contenedorSemana = document.getElementById('pronostico-semanal');
    if (contenedorSemana) {
        contenedorSemana.innerHTML = lugar.pronosticoSemanal.map(dia => {
            let icono = "☁️";
            if(dia.estado === "Soleado" || dia.estado === "Despejado") icono = "☀️";
            if(dia.estado === "Lluvia") icono = "🌧️";
            if(dia.estado === "Tormenta") icono = "⛈️";
            if(dia.estado === "Parcial") icono = "⛅";

            return `
                <div class="col-6 col-md-4 col-lg-3">
                    <article class="forecast-card h-100 p-3 border rounded text-center bg-white shadow-sm">
                        <h5 class="fw-bold">${dia.dia}</h5>
                        <div class="display-6 my-2">${icono}</div>
                        <p class="text-capitalize text-muted mb-2">${dia.estado}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <span class="fw-bold text-danger">${dia.max}°</span> 
                            <span class="fw-bold text-primary">${dia.min}°</span>
                        </div>
                    </article>
                </div>
            `;
        }).join('');
    }

    const stats = calcularEstadisticas(lugar.pronosticoSemanal);
    const contenedorStats = document.getElementById('contenedor-estadisticas');
    
    if (contenedorStats) {
        contenedorStats.innerHTML = `
            <div class="col-md-4">
                <div class="card p-3 mb-2 shadow-sm border-0 bg-light">
                    <h5 class="text-primary mb-3">🌡️ Temperaturas</h5>
                    <p class="mb-1">Mínima: <strong>${stats.min}°C</strong></p>
                    <p class="mb-1">Máxima: <strong>${stats.max}°C</strong></p>
                    <p class="mb-0">Promedio: <strong>${stats.promedio}°C</strong></p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card p-3 h-100 shadow-sm border-0 bg-light">
                    <h5 class="text-primary mb-3">📝 Resumen Semanal</h5>
                    <p class="lead mb-2">${stats.resumen}</p>
                    <small class="text-muted">
                        Días soleados: ${stats.diasSoleados} | Días lluviosos: ${stats.diasLluviosos}
                    </small>
                </div>
            </div>
        `;
    }
});