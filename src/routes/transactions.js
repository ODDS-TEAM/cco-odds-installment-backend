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

    //console.log(user_result);

    const newTransactionModel = new transactions({
      uid: user_result._id,
      ...req.body
    });
    console.log("newTransactionModel", newTransactionModel);
    await newTransactionModel.save();
    console.log("Insert Transaction Success");
    
    //if(req.body.type === "loan"){
        console.log("Transaction Type Loan: " );
        await user.updateOne(
            { _id: user_result._id },
            { $inc: { totalLoan: req.body.amount } }
          );
          console.log("********Update User Success");
      
          let financial_result = await financialInfo.find();
          await financialInfo.updateOne(
            { _id: financial_result[0]._id },
            { $inc: { totalDebt: req.body.amount } }
          );
          console.log("********Update Financial Success");
    //}
    

    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
