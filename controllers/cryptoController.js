const CryptoData = require("../models/CryptoData");
const config = require("../config/db");

class CryptoController {
  async getStats(req, res) {
    try {
      const { coin } = req.query;

      if (!config.supportedCoins.includes(coin)) {
        return res.status(400).json({ error: "Invalid coin specified" });
      }

      const latestData = await CryptoData.findOne({ coinId: coin }).sort({
        timestamp: -1,
      });

      if (!latestData) {
        return res
          .status(404)
          .json({ error: "No data found for specified coin" });
      }

      res.json({
        price: latestData.price,
        marketCap: latestData.marketCap,
        "24hChange": latestData.dayChange,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDeviation(req, res) {
    try {
      const { coin } = req.query;

      if (!config.supportedCoins.includes(coin)) {
        return res.status(400).json({ error: "Invalid coin specified" });
      }

      const lastRecords = await CryptoData.find({ coinId: coin })
        .sort({ timestamp: -1 })
        .limit(100)
        .select("price");

      if (lastRecords.length === 0) {
        return res
          .status(404)
          .json({ error: "No data found for specified coin" });
      }

      const prices = lastRecords.map((record) => record.price);
      const mean =
        prices.reduce((sum, price) => sum + price, 0) / prices.length;

      const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
      const variance =
        squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;
      const standardDeviation = Math.sqrt(variance);
      const roundedDeviation = parseFloat(standardDeviation.toFixed(5));

      console.log("Prices:", prices);
      console.log("Mean:", mean);
      console.log("Variance:", variance);
      console.log("Standard Deviation:", standardDeviation);
      console.log("Rounded Deviation:", roundedDeviation);

      res.json({
        deviation: roundedDeviation,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CryptoController();
