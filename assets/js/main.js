// --- agregue 10 ciudades
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


// --- agregue las cards
function cargarClima() {
    const contenedor = document.getElementById('contenedor-clima');
    let htmlCards = '';
    ciudades.forEach(ciudad => {

        htmlCards += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm text-center">
                    <div class="card-body">
                        <h1 class="display-4">${ciudad.img}</h1>
                        <h5 class="card-title">${ciudad.nombre}</h5>
                        <p class="card-text display-6">${ciudad.temp}°C</p>
                        <p class="card-text text-muted">${ciudad.clima}</p>
                        <button class="btn btn-primary" onclick="verDetalle(${ciudad.id})">Ver Detalle</button>
                    </div>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = htmlCards;
}

// --- iteraccion y navegacion de detalle
function verDetalle(id) {
    localStorage.setItem('ciudadSeleccionada', id);
    window.location.href = 'detalle.html';
}

// --- logica del nav var 
document.addEventListener("DOMContentLoaded", function() {
    // Si estamos en la página principal, cargamos las cards
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        cargarClima();
    }
    
    // Resaltar el enlace activo
    const page = window.location.pathname.split("/").pop();
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    if (page === "index.html" || page === "") {
        document.getElementById("nav-home")?.classList.add("active");
    } else if (page === "detalle.html") {

    } else if (page === "detalle.html") {
        document.getElementById("nav-detalle")?.classList.add("active");
    }
});