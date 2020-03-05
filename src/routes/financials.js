const express = require("express");
const router = new express.Router();
const financialInfo = require("../db/financialInfo");

router.get("/financials", async (req, res) => {
  try {
    let finacials = await financialInfo.find({});
    res.send(finacials);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/financials", async (req, res) => {
  try {
    let finacials = new financialInfo({
      totalDebt: 0,
      totalPaidAmount: 0,
      totalRemainingAmount: 0
    });

    await finacials.save();
    res.send(finacials);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
