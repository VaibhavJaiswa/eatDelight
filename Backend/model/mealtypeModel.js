const mongoose = require('mongoose')

//Restaurant schema
const mySchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

//exporting Restaurant Model
module.exports = mongoose.model("Mealtype",mySchema,"mealType")
                               //ModelName,   schema,  collection     
