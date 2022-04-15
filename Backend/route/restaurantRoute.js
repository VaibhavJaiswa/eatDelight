const express = require('express')
const controller = require('../controller/restaurantController')

const route = express.Router()

route.get("/menu",controller.getMenu)
route.post("/userInfo",controller.feedUser)
route.post("/authUser",controller.authUser)

route.get("/city",controller.getCity)

//this route gives mealtypes
route.get("/mealtype",controller.mealtype)

//this route gives all restaurants
route.get("/",controller.restaurant)

//this route gives all locations
route.get("/location",controller.location)

//this route gives citybyid
route.get("/location/byCityId/:cityId",controller.getCityById)

//this route gives locations by city Names eg Delhi
route.get("/location/:loc",controller.locationParam)

/**  Given below route returns api for restaurants with filters and sort and pagination 
 *   eg 
 *  {
        "city_id":"1",
        "cuisine":["North Indain","Chinese"],
        "lcost":0,
        "hcost":1000,
        "sort":1 // -1 to sort in decending order
    }
 * 
 */

route.post("/filter/:pgNo",controller.getRestaurantByFilter)

//this route returns selected restaurant displayed as per the filters applied
//eg : restaurantFilter/2/Food Adda
route.post("/restaurantFilter/:pgNo/:name",controller.getRestaurantByName)
route.get("/restaurantFilter/:name",controller.getRestaurantByName)
//this route returns restaurant with respect to location and restaurant name
/**eg: {
 *          "location":"Delhi",
            "name":"AMA Cafe"
 *     }
 *  */
route.post("/homePageFilter",controller.getRestaurantByLocationAndName)

module.exports = route