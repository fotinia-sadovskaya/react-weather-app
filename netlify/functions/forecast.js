// netlify/functions/forecast.js

export async function handler(event) {
    const lat = event.queryStringParameters.lat;
    const lon = event.queryStringParameters.lon;
    const apiKey = process.env.OPENWEATHER_KEY;
    const units = "metric";

    if (!lat || !lon) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing latitude or longitude" }),
        };
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(apiUrl); // глобальний fetch
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Forecast API error",
                details: error.message,
            }),
        };
    }
}