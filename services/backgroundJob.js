const cron = require("node-cron");
const CryptoData = require("../models/CryptoData");
const coingeckoService = require("./coingeckoService");
const config = require("../config/db");

class BackgroundJob {
  start() {
    cron.schedule("0 */2 * * *", async () => {
      console.log("Running background job to fetch crypto data");

      for (const coinId of config.supportedCoins) {
        try {
          const data = await coingeckoService.fetchCryptoData(coinId);

          await CryptoData.create({
            coinId,
            price: data.price,
            marketCap: data.marketCap,
            dayChange: data.dayChange,
          });

          console.log(`Data stored for ${coinId}`);
        } catch (error) {
          console.error(`Failed to fetch data for ${coinId}:`, error.message);
        }
      }
    });
  }
}

module.exports = new BackgroundJob();
