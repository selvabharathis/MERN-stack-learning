const Category = require("../models/category")

exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "category not found in DB"
            })
        }
        req.category = category
        next();
    })
}

exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "category not able to save in DB"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category)
}

exports.getAllCategories = (req,res) => {
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error: "no category found"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req,res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "unable to update category"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req,res) => {
    const category = req.category
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "unable to update category"
            })
        }
        res.json({
            message : `removed category - ${category.name} successfully`
        })
    })
}