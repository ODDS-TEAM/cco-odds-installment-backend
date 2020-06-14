const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());


const Loan = require('./models/Loan');
const Installment = require("./models/Installment");

app.get('/loans', async (req, res) => {
    const loans = await Loan.find({})
    res.send(loans)
})

app.post('/loans', async (req, res) => {
    let loan = new Loan({
        title: "ซื้อ Mac Book Pro ATB",
        date: new Date(),
        total: 150000,
        user: {
            name: "Athibet",
            email: "atb@odds.team",
            tel: "1234"
        }
    })
    let result = await loan.save()
    res.send(result)
})

app.get('/loans/:id', async (req, res) => {
    const loan = await Loan.findOne({ _id: req.params.id })
    res.send(loan)
})

app.post('/loans/:id/installments', async (req, res) => {
    let { amount, remark, submitDate } = req.body
    const loan = await Loan.findOne({ _id: req.params.id })
    let installment = new Installment({
        amount: amount,
        remark: remark,
        submitDate: submitDate,
        loanId: loan._id
    })
    let tnx = await installment.save()
    loan.installments.push(tnx)
    await loan.save()
    res.send(loan)
})

app.get('/loans/amount/remaining', (req, res) => {
    let amount = 100
    res.send({ amount })
})

module.exports = { app };