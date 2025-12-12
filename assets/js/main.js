document.addEventListener("DOMContentLoaded", () => {
    
    const ciudades = [
        { id: 1, nombre: "Santiago", clima: "Soleado", temp: 28, img: "☀️" },
        { id: 2, nombre: "Buenos Aires", clima: "Nublado", temp: 22, img: "☁️" },
        { id: 3, nombre: "Lima", clima: "Parcial", temp: 24, img: "⛅" },
        { id: 4, nombre: "Bogotá", clima: "Lluvia", temp: 15, img: "🌧️" },
        { id: 5, nombre: "Madrid", clima: "Despejado", temp: 10, img: "☀️" },
        { id: 6, nombre: "New York", clima: "Nieve", temp: -2, img: "❄️" },
        { id: 7, nombre: "Tokio", clima: "Lluvia", temp: 18, img: "🌧️" },
        { id: 8, nombre: "Sydney", clima: "Soleado", temp: 30, img: "☀️" },
        { id: 9, nombre: "Londres", clima: "Nublado", temp: 12, img: "☁️" },
        { id: 10, nombre: "París", clima: "Viento", temp: 14, img: "💨" }
    ];

    const contenedor = document.getElementById('contenedor-clima');

    const renderClima = () => {
        if (!contenedor) return;

        contenedor.innerHTML = ciudades.map(ciudad => `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="place-card">
                    <div class="place-card__body">
                        <div class="place-card__icon">${ciudad.img}</div>
                        <h2 class="place-card__title">${ciudad.nombre}</h2>
                        <div class="place-card__temp">${ciudad.temp}°C</div>
                        <p class="place-card__desc">${ciudad.clima}</p>
                        <button class="btn btn-outline-primary place-card__action" data-id="${ciudad.id}">
                            Ver Detalle
                        </button>
                    </div>
                </article>
            </div>
        `).join('');
    };

    if (contenedor) {
        contenedor.addEventListener('click', (e) => {
            if (e.target.matches('button[data-id]')) {
                const id = e.target.dataset.id;
                localStorage.setItem('ciudadSeleccionada', id);
                window.location.href = 'detalle.html';
            }
        });
        
        renderClima();
    }

    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});