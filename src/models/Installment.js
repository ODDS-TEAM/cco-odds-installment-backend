const mongoose = require('mongoose')
const Schema = mongoose.Schema

const installmentSchema = new Schema({
    submitDate: Date,
    amount: Number,
    remark: String,
    loanId: String
})

module.exports = mongoose.model('Installment', installmentSchema)
