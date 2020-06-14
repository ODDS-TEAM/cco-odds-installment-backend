const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loanSchema = new Schema({
    title: String,
    date: Date,
    total: Number,
    user: {
        name: String,
        email: String,
        tel: String
    },
    installments: Array
})

module.exports = mongoose.model('Loan', loanSchema)
