const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const financialInfo = require("../db/financialInfo");
const transactions = require("../db/transactions");
const userRoute = require("./user");
const transactionsRoute = require("./transactions");
const financialsRoute = require("./financials");
const user = require("../db/user");

async function start(
  name 
) {
  try {
    await mongoose.connect(name, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.use(bodyParser.json());
    app.use(userRoute);
    app.use(transactionsRoute);
    app.use(financialsRoute);

    app.get("/", (req, res) => res.send({ mesaage: "Hello Gony" }));
  } catch (error) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }
}

module.exports = { app, start };
