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
        title: req.body.title,
        date: new Date(),
        total: req.body.total,
        user: {
            name: req.body.name,
            email: req.body.email,
            tel: req.body.tel
        }
    })
    await loan.save()
    res.sendStatus(200)
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

app.get('/loans/amount/remaining', async (req, res) => {
    const amount = await Installment.aggregate([{
        $group: {
            _id: null,
            totalAmount: {
                $sum: "$amount"
            }
        }
    }])
    res.send({ amount: amount[0].totalAmount })
})

module.exports = { app };