# ClimaApp - Modulo 5

Esta es la actualizacion de mi proyecto para el Modulo 5. Lo principal que hice fue conectar la aplicacion a una API real para que los datos del clima sean verdaderos y reorganizar todo el codigo usando Clases, como pedia la rubrica.

## Que hay de nuevo
Deje de usar los datos inventados del modulo anterior. Ahora la app consulta el clima en tiempo real a internet. Tambien cambie la forma en que esta programado: pase de tener funciones sueltas a usar Programacion Orientada a Objetos.

## La API que use
Elegi Open-Meteo. Me parecio la mejor opcion porque es gratuita, bastante rapida y no pide registrarse ni usar claves (API Key), asi que es mas facil de probar.

## Como organice el codigo (Clases)
Para ordenar el proyecto dividi la logica en tres archivos principales:

* api.js: Aqui esta la clase WeatherAPI. Su unico trabajo es conectarse a Open-Meteo y traer la informacion.
* app.js: Aqui esta la clase WeatherApp. Es la que maneja todo: recibe los datos, saca las cuentas del promedio semanal y decide si hay que mostrar alguna alerta (por ejemplo, si va a llover mucho).
* config.js: Aca solamente guarde las coordenadas de las ciudades.

## Estadisticas y Alertas
Ahora las estadisticas del detalle (como el promedio de temperatura) se calculan con los datos que llegan de la API. Ademas, agregue una funcion que muestra una alerta automatica si detecta lluvia o temperaturas extremas en el pronostico.

## Tecnologias
* HTML5 y CSS (SASS + BEM)
* Bootstrap 5
* JavaScript (ES6+, Async/Await y Clases)

## Link al repositorio
https://github.com/anv0r/weather-frontend-m3.git

## Como probarlo
Solo hace falta abrir el archivo index.html en el navegador.