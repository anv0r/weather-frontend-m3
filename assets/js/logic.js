function obtenerLugarPorId(id) {
    return lugares.find(lugar => lugar.id === parseInt(id));
}

function calcularEstadisticas(pronostico) {
    let sumaPromedios = 0;
    let minSemanal = pronostico[0].min;
    let maxSemanal = pronostico[0].max;
    let diasSoleados = 0;
    let diasLluviosos = 0;

    for (let i = 0; i < pronostico.length; i++) {
        let dia = pronostico[i];

        if (dia.min < minSemanal) minSemanal = dia.min;
        if (dia.max > maxSemanal) maxSemanal = dia.max;

        sumaPromedios += (dia.min + dia.max) / 2;

        if (dia.estado === "Soleado" || dia.estado === "Despejado") {
            diasSoleados++;
        } else if (dia.estado === "Lluvia" || dia.estado === "Tormenta") {
            diasLluviosos++;
        }
    }

    let promedioTotal = (sumaPromedios / pronostico.length).toFixed(1);
    
    let mensajeResumen = "";
    if (diasSoleados > diasLluviosos) {
        mensajeResumen = "¡Semana ideal para salir! Predomina el sol ☀️";
    } else if (diasLluviosos >= 3) {
        mensajeResumen = "Prepara el paraguas, se espera mucha lluvia 🌧️";
    } else {
        mensajeResumen = "Semana con clima variable y cielos nublados ☁️";
    }

    return {
        min: minSemanal,
        max: maxSemanal,
        promedio: promedioTotal,
        resumen: mensajeResumen,
        diasSoleados: diasSoleados,
        diasLluviosos: diasLluviosos
    };
}