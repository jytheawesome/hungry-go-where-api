const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {Request, Response} = express;

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Endpoint to proxy the Google Places API request
app.get("/api/nearby-restaurants", async (req, res) => {
  const {latitude, longitude} = req.query;
  const apiKey = "AIzaSyBxPOata2rKGBKtqGI53U4DPfAoE_H4Hcw"; // Replace with your actual API key
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error);
    res.status(500).json({error: "An error occurred"});
  }
});

app.get("/api/search-restaurants", async (req, res) => {
  const {keyword, latitude, longitude} = req.query;
  const apiKey = "AIzaSyBxPOata2rKGBKtqGI53U4DPfAoE_H4Hcw"; // Replace with your actual API key
  const url_search = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&keyword=${keyword}&key=${apiKey}`;
  console.log(url_search);

  try {
    const response = await axios.get(url_search);
    res.json(response.data);
  } catch (error) {
    console.error("Error searching for restaurants:", error);
    res.status(500).json({error: "An error occurred"});
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
