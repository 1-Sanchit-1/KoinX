const mongoose = require("mongoose");

const cryptoDataSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  dayChange: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("CryptoData", cryptoDataSchema);
