const mongoose = require('mongoose')


//Location Schema
const schema = new mongoose.Schema({
    _id:String,
    itemName:String,
    desc:String,
    rate:Number,
    vegStatus:Boolean
})

//exporting location model
module.exports = mongoose.model('menu',schema,'menu')