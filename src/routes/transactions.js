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


    // find financial
    let financial_result = await financialInfo.find();

    if (req.body.type === "loan") {
      console.log("Transaction Type Loan: ");
      await user.updateOne(
        { _id: user_result._id },
        {
          $inc: { totalLoan: req.body.amount },
          remainingAmount:
            user_result.totalLoan + req.body.amount - user_result.paidAmount
        }
      );
      console.log("********Update User Success");

      await financialInfo.updateOne(
        { _id: financial_result[0]._id },
        {
          $inc: { totalDebt: req.body.amount },
          totalRemainingAmount:
            financial_result[0].totalDebt +
            req.body.amount -
            financial_result[0].totalPaidAmount
        }
      );
      console.log("********Update Financial Success");
    } else if (req.body.type === "payment") {
      console.log("Transaction Type payment: ");
      await user.updateOne(
        { _id: user_result._id },
        {
          $inc: {
            paidAmount: req.body.amount
          },
          remainingAmount:
            user_result.totalLoan - (user_result.paidAmount + req.body.amount)
        }
      );

      console.log("********Update User Success");

      await financialInfo.updateOne(
        { _id: financial_result[0]._id },
        {
          $inc: {
            totalPaidAmount: req.body.amount
          },
          totalRemainingAmount:
            financial_result[0].totalDebt -
            (financial_result[0].totalPaidAmount + req.body.amount)
        }
      );
      console.log("********Update Financial Success");
    }

    const newTransactionModel = new transactions({
      uid: user_result._id,
      ...req.body
    });

    console.log("newTransactionModel", newTransactionModel);
    await newTransactionModel.save();
    console.log("Insert Transaction Success");

    res.send({
      user: await user.findById(req.params.userId),
      financial: await financialInfo.find(),
      transaction: newTransactionModel,
      reqBody: req.body
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
