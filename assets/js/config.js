const ciudadesConfig = [
    { id: 1, nombre: "Santiago", lat: -33.4489, lon: -70.6693, imagen: "🏙️" },
    { id: 2, nombre: "Buenos Aires", lat: -34.6037, lon: -58.3816, imagen: "💃" },
    { id: 3, nombre: "Lima", lat: -12.0464, lon: -77.0428, imagen: "🥘" },
    { id: 4, nombre: "Bogotá", lat: 4.7110, lon: -74.0721, imagen: "⛰️" },
    { id: 5, nombre: "Madrid", lat: 40.4168, lon: -3.7038, imagen: "🏰" },
    { id: 6, nombre: "New York", lat: 40.7128, lon: -74.0060, imagen: "🗽" },
    { id: 7, nombre: "Tokio", lat: 35.6895, lon: 139.6917, imagen: "⛩️" },
    { id: 8, nombre: "Sydney", lat: -33.8688, lon: 151.2093, imagen: "🐨" },
    { id: 9, nombre: "Londres", lat: 51.5074, lon: -0.1278, imagen: "💂" },
    { id: 10, nombre: "París", lat: 48.8566, lon: 2.3522, imagen: "🥐" }
];

function interpretarCodigoClima(code) {
    if (code === 0) return { texto: "Despejado", icono: "☀️" };
    if (code >= 1 && code <= 3) return { texto: "Nublado", icono: "☁️" };
    if (code >= 45 && code <= 48) return { texto: "Niebla", icono: "🌫️" };
    if (code >= 51 && code <= 67) return { texto: "Lluvia", icono: "🌧️" };
    if (code >= 71 && code <= 77) return { texto: "Nieve", icono: "❄️" };
    if (code >= 80 && code <= 82) return { texto: "Chubascos", icono: "🌦️" };
    if (code >= 95 && code <= 99) return { texto: "Tormenta", icono: "⛈️" };
    return { texto: "Desconocido", icono: "❓" };
}