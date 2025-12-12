document.addEventListener('DOMContentLoaded', () => {
    
    const idCiudad = localStorage.getItem('ciudadSeleccionada');
    if (!idCiudad) {
        window.location.href = 'index.html';
        return;
    }

    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const nombresCiudades = {
        1: "Santiago", 2: "Buenos Aires", 3: "Lima", 4: "Bogotá", 
        5: "Madrid", 6: "New York", 7: "Tokio", 8: "Sydney", 
        9: "Londres", 10: "París"
    };

    const tituloEl = document.getElementById('nombre-ciudad');
    if (tituloEl) tituloEl.textContent = nombresCiudades[idCiudad] || `Ciudad #${idCiudad}`;

    const contenedorSemana = document.getElementById('pronostico-semanal');
    if (contenedorSemana) {
        const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const iconos = ['☀️', '⛅', '🌧️', '⛈️'];

        contenedorSemana.innerHTML = dias.map(dia => {
            const min = getRandom(5, 15);
            const max = getRandom(20, 32);
            const icono = iconos[getRandom(0, iconos.length)];

            return `
                <div class="col-6 col-md-4 col-lg-3">
                    <article class="forecast-card h-100">
                        <div class="forecast-card__body d-flex flex-column justify-content-between h-100">
                            <div>
                                <h4 class="forecast-card__day">${dia}</h4>
                                <div class="forecast-card__icon">${icono}</div>
                            </div>
                            <div class="forecast-card__temps mt-2">
                                <span class="forecast-card__temp-high">${max}°</span> 
                                <span class="forecast-card__temp-low text-muted">/ ${min}°</span>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        }).join('');
    }
});