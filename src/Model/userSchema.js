const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        minlength : 3
    },
    lastname : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        unique : [true, "email already exist"]
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['student', 'admin', 'feculty'],
        default : "student"
    },
    status : {
        type : Boolean,
        required : true,
        enum : [0,1],
        default : 1
    },
    created_at : {
        type : Date,
        default :  Date.now(),
        required : true
    },

})
const User = new mongoose.model("User", userSchema)
module.exports = User
