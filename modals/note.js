const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notesSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    isreq : {
        type : String,
        required : true
    },
    link : {
       type : String,
       required : true
   },
   subject : {
       type : String,
       required : true
   },
   semester : {
       type: Number,
       required : true
   },
   course : {
       type  : String,
       required : true
   },
   ctype: {
     type : String,
     required : true
   },
   likes: {
    type: Array,
    required: false 
   },
   dislikes: {
    type: Array,
    required: false 
   },
   clicks: {
       type: Number,
       required: false
   }
})

module.exports = mongoose.model("Notes" , notesSchema)
