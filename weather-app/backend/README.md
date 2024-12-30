node.js Weather API
A simple backend API built with Node.js and Express that fetches weather data from the OpenWeather API. This service allows users to request weather information for a city, and it returns details such as the city name, temperature, weather description, and humidity.

Features
Fetch weather data for any city by making a GET request to the /api/weather endpoint.
Defaults to fetching weather data for Nairobi if no city is provided.
Uses the OpenWeather API to retrieve current weather conditions.
Responds with weather information including:
City name
Current temperature (in Celsius)
Weather description (e.g., clear sky, rain)
Humidity percentage

Technologies Used
Node.js for the server-side environment.
Express for creating the API server and handling routes.
Axios for making HTTP requests to the OpenWeather API.
OpenWeather API for fetching weather data.

Setup and Installation
Prerequisites
Node.js (v14.x or higher)

Installation Steps
Clone this repository:
git clone https://github.com/yourusername/weather-api.git

Navigate to the project directory:
cd weather-app/backend

Install dependencies:
npm install

Start the server:
node express.js

The server will run on http://localhost:5000.

API Usage
To fetch weather data for a city, make a GET request to the following endpoint:
GET /api/weather?city=<city_name>

Example Request:
GET http://localhost:5000/api/weather?city=Nairobi

Example Response:
{
  "name": "Nairobi",
  "temperature": 15,
  "description": "overcast clouds",
  "humidity": 72
}
If no city is provided, the API will default to fetching weather data for Nairobi.

Error Handling
If the API request fails or there is an issue retrieving the weather data, the server will respond with a 500 status code and an error message:
"Error retrieving weather data"
