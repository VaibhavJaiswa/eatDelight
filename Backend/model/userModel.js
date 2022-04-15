const mongoose = require('mongoose')


//Location Schema
const schema = new mongoose.Schema({
    _id:String,
    name:String,
    email:String,
    password:String,
    mob:String,
    deliveryAddress:String,
    loginThrough:String,
    profile:String,
    orders:Array
})

//exporting location model
module.exports = mongoose.model('UserInfo',schema,'userInfo')