const express = require("express")
const router = express.Router()

const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProduct,getAllUniqueCategories} = require("../controllers/product")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById)
router.param("productId",getProductById)
//actual routes
//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
//read route
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
//delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
//update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
//listing route
router.get("/products",getAllProduct)

router.get("/products/categories",getAllUniqueCategories)

module.exports = router