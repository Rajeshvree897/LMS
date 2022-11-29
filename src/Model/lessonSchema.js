const mongoose = require('mongoose')
const lessonSchema = new mongoose.Schema({
    course_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    title : {
        type : String,
        required : true,
        minlength : 3
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    cloudnary_id : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default :  Date.now(),
        required : true
    },

})
const Lesson = new mongoose.model("Lesson", lessonSchema)
module.exports = Lesson
