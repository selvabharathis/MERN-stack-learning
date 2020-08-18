// declaring instances and getting required module
const mongoose = require("mongoose")

//creating a schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, {timestamps: true} )

//exporting the schema
module.exports = mongoose.model("Category",categorySchema)