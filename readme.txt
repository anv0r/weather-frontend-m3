# ClimaApp - Módulo 4 (Lógica con JavaScript)

Este es mi proyecto para el Módulo 4. Tomé la maquetación que hice anteriormente y le agregué lógica con JavaScript para manejar datos y cálculos reales, en lugar de tener información estática en el HTML.

## Descripción
Es una aplicación web para consultar el clima. Muestra un listado de ciudades y permite ver un detalle con el pronóstico semanal. El objetivo principal de esta versión fue practicar el uso de arreglos, objetos y manipulación del DOM.

## Estructura de Datos (Modelado)
Para no depender del HTML, moví toda la información a un archivo JavaScript (`data.js`):
* Uso un **arreglo de objetos** llamado `lugares` para guardar las ciudades.
* Cada ciudad tiene sus propiedades (ID, nombre, temperatura actual) y un arreglo interno llamado `pronosticoSemanal`.
* El pronóstico contiene la información detallada de los 7 días (mínima, máxima y estado del clima).

## Estadísticas del Clima
En la vista de detalle, el sistema recorre el arreglo del pronóstico y calcula automáticamente:
* El **promedio** de temperatura de la semana.
* Las temperaturas **mínima y máxima** absolutas.
* Un conteo de cuántos días serán soleados o lluviosos.
* Un **resumen textual** que cambia dinámicamente según el clima predominante (ej: "Semana ideal para salir" o "Semana inestable").

## Tecnologías
* HTML5 Semántico
* CSS / SASS (con metodología BEM)
* Bootstrap 5.3
* JavaScript (ES6+)

## Enlace al Repositorio
https://github.com/anv0r/weather-frontend-m3.git

## Cómo ejecutarlo
Simplemente abre el archivo `index.html` en tu navegador web.