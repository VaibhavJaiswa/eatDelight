const mongoose = require('mongoose')
const Schema = mongoose.Schema
let Transaction  = new Schema({
    transactionid:{
        type:String
    },
    transactionamount:{
        type:String
    }
})

module.exports = mongoose.model('Transaction',Transaction)