document.addEventListener('DOMContentLoaded', () => {
    
    // Recuperamos el ID que guardamos en localStorage al hacer clic en el Home
    const idCiudad = localStorage.getItem('ciudadSeleccionada');

    // Validación de seguridad: Si no hay ID, regresar al home
    if (!idCiudad) {
        window.location.href = 'index.html';
        return;
    }

    let nombreCiudad = "Ciudad Desconocida";
    
    // cambio el id por un numero 
    switch(parseInt(idCiudad)) {
        case 1: nombreCiudad = "Santiago"; break;
        case 2: nombreCiudad = "Buenos Aires"; break;
        case 3: nombreCiudad = "Lima"; break;
        case 4: nombreCiudad = "Bogotá"; break;
        case 5: nombreCiudad = "Madrid"; break;
        case 6: nombreCiudad = "New York"; break;
        case 7: nombreCiudad = "Tokio"; break;
        case 8: nombreCiudad = "Sydney"; break;
        case 9: nombreCiudad = "Londres"; break;
        case 10: nombreCiudad = "París"; break;
        default: nombreCiudad = "Localidad #" + idCiudad;
    }

    const tituloElement = document.getElementById('nombre-ciudad');
    tituloElement.innerText = nombreCiudad;

    // genera el pronostico semanal aleatorio 
    const contenedorSemana = document.getElementById('pronostico-semanal');
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let htmlContent = '';

    dias.forEach(dia => {
        // da la temperatura aleatoria
        const min = Math.floor(Math.random() * (15 - 5) + 5);  // Entre 5 y 15
        const max = Math.floor(Math.random() * (35 - 20) + 20); // Entre 20 y 35
        
        // da icono aleatorio
        const iconos = ['☀️', '⛅', '🌧️', '⛈️'];
        const iconoRandom = iconos[Math.floor(Math.random() * iconos.length)];

        // construimos la card
        htmlContent += `
            <div class="col-6 col-md-4 col-lg">
                <div class="card h-100 text-center border-0 shadow-sm custom-hover">
                    <div class="card-body">
                        <h6 class="card-title text-muted mb-3">${dia}</h6>
                        <div class="display-4 mb-2">${iconoRandom}</div>
                        <div>
                            <span class="fw-bold fs-5">${max}°</span> 
                            <span class="text-secondary small">/ ${min}°</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Inyectar todo el HTML generado en el contenedor
    contenedorSemana.innerHTML = htmlContent;
});