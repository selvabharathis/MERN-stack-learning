const express = require("express")
const router = express.Router()
const {getUser,getUserById,updateUser,userPurchaseList} = require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

// router.get("/users",users)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)

module.exports = router
