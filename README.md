# Simple Weather App

**Project Date:** August 21, 2025
**Technologies:** HTML5, CSS3, JavaScript (ES6+), Serverless Functions (Netlify)
**Live Demo:** [https://budi-weather-app.netlify.app/](https://budi-weather-app.netlify.app/)

## 1. Project Overview

This is a clean, responsive, and user-friendly web application that provides real-time weather data for any city in the world. The application is built with a modern front-end stack and leverages a serverless function on the back-end to securely handle API requests.

The primary goal of this project was to demonstrate proficiency in core front-end technologies (HTML, CSS, JavaScript) and the ability to interact with a third-party API in a secure and efficient manner. The front-end fetches data asynchronously, providing a smooth, single-page application experience.

## 2. Core Features

- **City Search:** Users can search for any city to get the current weather conditions.
- **Dynamic Data Display:** The app displays the city name, temperature, a weather icon, and a short description (e.g., "Clear sky," "Light rain").
- **Real-Time API Integration:** Weather data is fetched live from the [OpenWeatherMap API](https://openweathermap.org/api).
- **Error Handling:** Provides clear feedback to the user if a city is not found or if an API error occurs.
- **Responsive Design:** The interface is fully responsive and works seamlessly on both desktop and mobile devices.
- **Secure API Key:** The API key is never exposed to the client-side, ensuring it remains secure.

## 3. Technical Architecture

The application uses a decoupled architecture where the front-end is responsible for the user interface and the back-end (a serverless function) acts as a secure proxy for API calls.

### **Front-End (Client-Side)**

- #### HTML (`index.html`)

  The application structure is built with semantic HTML5, including a `<form>` for user input and dedicated containers for displaying the weather data and any error messages.

- #### CSS (`style.css`)

  Modern CSS3 is used for styling, featuring:

  - **Flexbox:** For creating a flexible and centered layout.
  - **Responsive Design:** Media queries are used to ensure the layout adapts to various screen sizes.
  - **Visual Enhancements:** A frosted glass effect and a gradient background are used to create a modern and visually appealing interface.

- #### JavaScript (`script.js`)
  Vanilla JavaScript (ES6+) powers the application's interactivity.
  - **Asynchronous `fetch()` API:** Used to make network requests to the back-end serverless function without reloading the page.
  - **DOM Manipulation:** Dynamically updates the HTML to display the weather data or error messages returned from the server.
  - **Event Handling:** Listens for the form `submit` event to trigger the weather search.

### **Back-End (Serverless Function)**

To avoid exposing the OpenWeatherMap API key in the client-side code, a serverless function (hosted on Netlify) acts as a secure intermediary.

- #### Netlify Function (`netlify/functions/get-weather.js`)
  This is a simple Node.js function that runs on the server.
  - **Proxy Role:** Its only job is to receive a city name from the front-end.
  - **Secure API Key Access:** It securely accesses the API key, which is stored as an **environment variable** in the Netlify dashboard.
  - **API Call:** It then makes the actual request to the OpenWeatherMap API, adding the secret key on the server-side.
  - **Data Forwarding:** Finally, it forwards the response from the OpenWeatherMap API back to the front-end.

## 4. Secure Data Flow

1.  **User Action:** The user enters a city and submits the form.
2.  **JavaScript `fetch()`:** The front-end JavaScript sends a `fetch` request to its own back-end endpoint: `/.netlify/functions/get-weather?city=London`. **The API key is NOT included in this request.**
3.  **Netlify Function Executes:** The serverless function receives the request. It retrieves the secret API key from its secure environment variables.
4.  **External API Call:** The function makes a new request to the OpenWeatherMap API, including the city name and the secret API key.
5.  **Response:** The OpenWeatherMap API sends the weather data back to the Netlify function.
6.  **Data Forwarded to Client:** The Netlify function forwards this data back to the front-end JavaScript.
7.  **UI Update:** The JavaScript receives the data and updates the DOM to display the weather to the user.

This flow ensures the API key is never exposed in the browser, protecting it from being stolen and misused.

## 5. How to Run Locally

To run this project on your local machine, you will need to:

1.  Clone the repository.
2.  Install the Netlify CLI: `npm install netlify-cli -g`.
3.  Create a `.env` file in the root of the project.
4.  Add your OpenWeatherMap API key to the `.env` file: `WEATHER_API_KEY=your_actual_api_key_here`.
5.  Run the command `netlify dev` to start a local development server that can run the serverless function.
