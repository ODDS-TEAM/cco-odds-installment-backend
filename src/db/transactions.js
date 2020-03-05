const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require('./user')
const TransactionsSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: user },
  amount: Number,
  date: {
    type: Date,
    default: Date.now()
  },
  evidence: String,
  type: String
});

module.exports = mongoose.model(
  "transactions",
  TransactionsSchema,
  "transactions"
);
