// declaring instances and getting required module
var mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

//With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our userSchema
//creating a schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo:{
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true})

//creating a virtual field password, executed while user sign up or change password
userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
//method inside schema
userSchema.methods = {

    autheticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return ""
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex')
        }catch(err){
            return "";
        }
    }
}

// The next step is compiling our schema into a Model
//An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database
//The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()
//exporting the schema
module.exports = mongoose.model("User",userSchema)