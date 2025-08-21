// This is server-side code (Node.js)
exports.handler = async function(event, context) {
    // Get the city from the query parameter sent by the front-end
    const city = event.queryStringParameters.city;
    
    // Get the secret API key from the environment variables
    const apiKey = process.env.WEATHER_API_KEY;
    
    // Construct the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Return a success response to the front-end
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        // Return an error response to the front-end
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather data' })
        };
    }
};