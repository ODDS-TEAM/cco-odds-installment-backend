const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')

const financialInfo = require("../db/financialInfo");
const transactions = require("../db/transactions");
const userRoute = require("./user");
const transactionsRoute = require("./transactions");
const financialsRoute = require("./financials");
const user = require("../db/user");

function start(name) {

  app.use(cors())
  app.use(bodyParser.json());
  app.use(userRoute);
  app.use(transactionsRoute);
  app.use(financialsRoute);

  app.get("/", (req, res) => res.send({ mesaage: "Hello Gony" }));
}

module.exports = { app, start };
