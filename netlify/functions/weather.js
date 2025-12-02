// netlify/functions/weather.js

// Динамічний імпорт node-fetch (сумісний з CommonJS)
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

export async function handler(event) {
    const city = event.queryStringParameters.city || "Burgas";
    const apiKey = process.env.OPENWEATHER_KEY; // ключ зберігається у Netlify Environment Variables
    const units = "metric";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Weather API error",
                details: error.message,
            }),
        };
    }
}
