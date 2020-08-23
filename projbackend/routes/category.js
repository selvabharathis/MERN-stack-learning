var express = require('express')
var router = express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategories,updateCategory,removeCategory} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

// params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routes goes here
//create
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
//read
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategories)
//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)

module.exports = router