const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your-api-key-here';

// Get current weather
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${city}`;
    } else {
      return res.status(400).json({ error: 'Please provide lat/lon or city' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get 5-day forecast
app.get('/api/forecast', async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${city}`;
    } else {
      return res.status(400).json({ error: 'Please provide lat/lon or city' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Forecast API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch forecast data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

