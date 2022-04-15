const restaurant = require("../model/restaurantModel")
const location = require('../model/locationModel')
const mealtype = require('../model/mealtypeModel')
const userInfo = require('../model/userModel')
const menu = require('../model/menuModel')



exports.getMenu=(req,res)=>{
    menu.find().then(result=>{
        res.status(200).json({
            Messege:"Menu Description",
            details:result
        }).catch(err=>{
            res.status(500).json({
                Error:"Error Occured:-"+err
            })
        })
    })
}


exports.authUser = (req,res)=>{
    let filter = {}
    
    filter.email=req.body.email
    console.log(filter.email)
    filter.password=req.body.password
    console.log(filter.password)

    userInfo.findOne(filter).then(result=>{
        res.status(200).json({
            Message:`User Authentication`,
            details:result
        })
        console.log(result)
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}
exports.feedUser = (req,res)=>{
    let user = {}
    if(req.body.name){
        user.name = req.body.name
    }
    if(req.body.email){
        user.email = req.body.email
    }
    if(req.body.password){
        user.password = req.body.password
    }
    if(req.body.mob){
        user.mob = req.body.mob
    }
    if(req.body.deliveryAddress){
        user.deliveryAddress = req.body.deliveryAddress
    }
    if(req.body.loginThrough){
        user.loginThrough = req.body.loginThrough
    }
    if(req.body.profile){
        user.profile = req.body.profile
    }
    if(req.body.orders){
        user.orders = req.body.orders
    }
    
    userInfo.insertMany(user)
    .then(result=>{
        console.log(result)
                res.status(200).json({
                    Message:"User Inserted",
                    restaurant:result,
                    
                });
    }).catch(err=>{console.log(`Error : ${err}`);res.status(500).json({"Error":err})})


}
exports.getCity = (req,res)=>{
    restaurant.find({},{city_name:1,city:1}).then(result=>{
        console.log(result)
        res.status(200).json({
            "Message":"City",
            "city":result
        })
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}
exports.getCityById = (req,res)=>{

    let filter ={city:req.params.cityId}
    
    restaurant.find(filter).then(result=>{
        res.status(200).json({
            Message:`Restaurant : ${req.body.city}`,
            city:result
        })
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}
exports.mealtype = (req,res)=>{
    mealtype.find()
    .then(result=>{
        res.status(200).json({
            Message:"Mealtypes",
            mealtype:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}
//Filters Restaurant by Location and Names
exports.getRestaurantByLocationAndName = (req,res)=>{
    let filter ={}
    filter.city_name = req.body.location
    filter.name = req.body.name
    restaurant.find(filter).then(result=>{
        res.status(200).json({
            Message:`Restaurant : ${req.body.name}`,
            details:result
        })
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}
//Filters restaurant by name
exports.getRestaurantByName = (req,res)=>{
    let filter = {}
    filter.name = req.params.name
    restaurant.findOne(filter).then(result=>{
        console.log(typeof(result))
        res.status(200).json({
            Message:`Restaurant ${req.params.name}`,
            restaurantDetail:result
        })
    }).catch(err=>{
        res.status(500).json({"Error":err})
    })
}
//Restaurant are getting filtered by various filters like location, cuisine, low cost, high cost and pagination
exports.getRestaurantByFilter = (req,res)=>{
    let filter = {}

    if(req.body.city_name){
        filter.city_name = req.body.city_name
        console.log(filter)
    }
    if(req.body.mealType){
        filter['type.name'] = { $in :req.body.mealType }
    }
    if(req.body.cuisine && req.body.cuisine.length>0){
        filter['Cuisine.name'] = { $in : req.body.cuisine }
        console.log(filter)
    }
    if(req.body.lcost && req.body.hcost){
        if(req.body.lcost==0){
            filter.cost={
                $lte:req.body.lcost
            }
        }
        else{
            filter.cost={
                $lt: req.body.hcost,
                $gt: req.body.lcost
            }
        }
        console.log(filter)
    }
    
    restaurant.find(filter).limit(2).skip(2*(req.params.pgNo-1)).sort({cost:req.body.sort})
    .then(result=>{
        restaurant.find(filter).count((err,count)=>{
            if(err)
                console.log(err)
            else
                res.status(200).json({
                    Message:"Restaurant By Filter Now",
                    restaurant:result,
                    pageCount:Math.round(count/2)
                })
        })
    }).catch(err=>{console.log(`Error : ${err}`);res.status(500).json({"Error":err})})
}

//this module returns all the restaurants
exports.restaurant = (req,res)=>{
    restaurant.find().then(
        result=>{console.log(result)
            res.status(200).json(
                {
                    Message:"Fetching Restaurants",
                    Data:result
                }
            )
        }
    ).catch(err=>{
        res.status(500).json({
            error:`Error in fetching Data `
        })
    })    
}

//this module returns all locations
exports.location = (req,res)=>{
    location.find().then(loc=>{
        res.status(200).json(
            {
                Message:"Location Fetched",
                Location:loc
            }
        )
    }).catch(
        err=>{
            res.status(500).json({
                Error:"Error Occured in fetching Location :- "+err
            })
        }
    )
}

//this module returns location by city Names
exports.locationParam = (req,res)=>{
    let param = {city_id:req.params.loc};
    location.find(param).then(loc=>{
        res.status(200).json(
            {
                Message:"Location Fetched",
                Location:loc
            }
        )
    }).catch(
        err=>{
            res.status(500).json({
                Error:"Error Occured in fetching Location :- "+err
            })
        }
    )
}

