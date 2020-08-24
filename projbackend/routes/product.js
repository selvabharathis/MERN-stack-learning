const express = require("express")
const router = express.Router()

const {getProductById,createProduct} = require("../controllers/product")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById)
router.param("productId",getProductById)
//actual routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

module.exports = router