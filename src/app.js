const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());


const Loan = require('./models/Loan')

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

module.exports = { app };