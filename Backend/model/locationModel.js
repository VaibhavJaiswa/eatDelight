const mongoose = require('mongoose')


//Location Schema
const schema = new mongoose.Schema({
    _id:String,
    name:String,
    city_id:String,
    location_id:String,
    country_name:String
})

//exporting location model
module.exports = mongoose.model('Location',schema,'location',)