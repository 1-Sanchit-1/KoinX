const axios = require("axios");
const config = require("../config/db.js");

class CoingeckoService {
  async fetchCryptoData(coinId) {
    try {
      const response = await axios.get(
        `${config.coingeckoApiBase}/simple/price`,
        {
          params: {
            ids: coinId,
            vs_currencies: "usd",
            include_market_cap: true,
            include_24hr_change: true,
          },
          headers: {
            "x-cg-demo-api-key": config.coingeckoApiKey,
          },
        }
      );

      const data = response.data[coinId];
      return {
        price: data.usd,
        marketCap: data.usd_market_cap,
        dayChange: data.usd_24h_change,
      };
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error.message);
      throw error;
    }
  }
}

module.exports = new CoingeckoService();
