const mongoose = require("mongoose")

const BookpropertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    }
})

const BookpropertyModel = mongoose.model("bookproperty", BookpropertySchema);
module.exports = BookpropertyModel;
