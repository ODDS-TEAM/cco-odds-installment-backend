const express = require("express");
const router = new express.Router();
const user = require("../db/user");
const financialInfo = require("../db/financialInfo");
const transactions = require("../db/transactions");

router.get("/transactions", async (req, res) => {
  try {
    let transaction = await transactions.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/transactions/:userId", async (req, res) => {
  try {
    // find user by id
    let user_result = await user.findById(req.params.userId);

    const newTransactionModel = new transactions({
      uid: user_result._id,
      amount: 40000,
      date: Date.now(),
      evidence: "http//:img.proof",
      type: "loan"
    });
    console.log("newTransactionModel", newTransactionModel);
    await newTransactionModel.save();

    await userModel.update(
      { _id: ObjectId("5e5f4b23cccb9436f40a771d") },
      { $inc: { totalLoan: 40000 } }
    );
    await userModel.save();
    // await financialModel.update({ _id: "5e5e249006400b2c10ec9f2a" }, { $inc: { totalDebt: 40000} })
    // await financialModel.save()
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
