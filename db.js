const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongodb server");
});

db.on("error", (err) => {
  console.log("Mongodb  connected error:", err);
});

db.on("disconnected", () => {
  console.log("disConnected to mongodb server");
});

module.exports = db;
