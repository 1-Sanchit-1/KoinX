const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");
const backgroundJob = require("./services/backgroundJob");
require("dotenv").config();

const app = express();

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use("/api", cryptoRoutes);
backgroundJob.start();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
