const express = require('express')
const controller = require('../controller/payController')

const route = express.Router()

route.post("",controller.completePayment)
route.post("/save",controller.saveTransaction)

module.exports = route