// server/routes/agmarknet.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Agmarknet Daily Market Prices Resource ID
// Source: https://data.gov.in/resources/agmarknet-daily-market-prices
const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

router.get("/prices", async (req, res) => {
  try {
    const { commodity, state } = req.query;

    if (!commodity || !state) {
      return res.status(400).json({ error: "Please provide commodity and state" });
    }

    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${process.env.DATA_GOV_KEY}&format=json&limit=10&filters[commodity]=${encodeURIComponent(
      commodity
    )}&filters[state]=${encodeURIComponent(state)}`;

    const response = await axios.get(url);

    res.json(response.data.records); // send only the records array
  } catch (error) {
    console.error("Error fetching Agmarknet data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
