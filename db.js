const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = process.env.MONGODB_URL_Local; //local mongodb compass url

const mongoURL = process.env.MONGODB_URL;

//SETUP MONGODB CONNECTION
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,  // render is not accepting this code so i comment this code
  useUnifiedTopology: true,
});

//Get the default connection
// Mongoose maintains a default connection object representing the mongodb connections

const db = mongoose.connection;

//Define the listener for database connection
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
