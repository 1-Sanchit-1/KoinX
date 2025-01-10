require("dotenv").config();

const config = {
  mongoUri: process.env.MONGO_URL,
  port: process.env.PORT,
  coingeckoApiBase: "https://api.coingecko.com/api/v3",
  coingeckoApiKey: process.env.API_KEY,
  supportedCoins: ["bitcoin", "matic-network", "ethereum"],
};

module.exports = config;
