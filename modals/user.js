const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true 
    },
    password : {
        type : String,
        required : true
    },
    imgUrl : {
        type: String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    semester : {
        type : Number,
        required : true
    },

})

module.exports = mongoose.model("Users" , userSchema)
