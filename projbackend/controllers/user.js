const User = require("../models/user.js")
const Order = require("../models/order")

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "no user found in DB"
            })
        }
        req.profile = user;
        next()
    })
}

exports.getUser = (req,res)=>{
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt =undefined
    return res.json(req.profile)
}

// exports.users = (req,res)=>{
//     User.find({},"email").exec((err,user)=>{
//         if(err || !user){
//             return res.status(402).json({
//                 error : "no user is in database"
//             })
//         }
//         return res.json(user)
//     })
// }

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    error : "you are not authorised to update"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = undefined
            user.updatedAt =undefined
            return res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user : req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error : "no order placed so far"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    //store that in DB
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push: {purchases: purchases}},
        {new : true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "unable to save purchase list"
                })
            }
            next()
        }
    )
}