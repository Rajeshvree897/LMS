const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        required : true,
        default:0
    },
    date : {
        type : Date,
        default :  Date.now(),
        required : true
    }

})
const Course = new mongoose.model("Course", courseSchema)
module.exports = Course
