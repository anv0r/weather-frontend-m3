class WeatherAPI {
    constructor() {
        this.baseUrl = "https://api.open-meteo.com/v1/forecast";
    }

    async getWeather(lat, lon) {
        try {
            const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}