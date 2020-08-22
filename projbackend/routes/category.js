var express = require('express')
var router = express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategories} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

// params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routes goes here
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategories)

module.exports = router