require("dotenv").config();
const express = require("express");

// Fix node-fetch import issue for Node.js v20+
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5001;

const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Allow frontend
    methods: "GET",
  })
); 

const apiKey = process.env.WEATHER_API_KEY;

// Route to get current weather data
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Route to get forecast data
app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    res.status(500).json({ error: "Error fetching forecast data" });
  }
});

// Handle Uncaught Errors to Prevent Crashes
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
