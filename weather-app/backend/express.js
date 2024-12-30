const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;

const app = express();
const port = 5000;

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Nairobi';
    const apiKey = 'f8b4ddb66701878c509b05da7dc226ef';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      name: weather.name,
      temperature: weather.main.temp,
      description: weather.weather[0].description,
      humidity: weather.main.humidity,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
