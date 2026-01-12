document.addEventListener("DOMContentLoaded", () => {
    
    const contenedor = document.getElementById('contenedor-clima');

    const renderClima = () => {
        if (!contenedor) return;

        contenedor.innerHTML = lugares.map(lugar => `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="place-card">
                    <div class="place-card__body">
                        <div class="place-card__icon">${lugar.imagen}</div>
                        <h2 class="place-card__title">${lugar.nombre}</h2>
                        <div class="place-card__temp">${lugar.tempActual}°C</div>
                        <p class="place-card__desc">${lugar.estadoActual}</p>
                        <button class="btn btn-outline-primary place-card__action" data-id="${lugar.id}">
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