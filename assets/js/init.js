window.app = new WeatherApp();

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contenedor-clima')) {
        window.app.initHome();
    } else if (document.getElementById('pronostico-semanal')) {
        window.app.initDetalle();
    }
});