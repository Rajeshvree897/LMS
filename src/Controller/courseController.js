const Course = require('../Model/courseSchema')
const CourseController = {
    createCourse : async function(req, res, next){
        try{
            const {title, description} = req.body
            if(!(title && description)){
                res.status(400).send("All Inputs is required")
            }
            let user_id = req.params.user_id;
            req.body.user_id = user_id
             const courseData =  new Course(req.body)  
             const user = await courseData.save();
             res.status(200).json({course: courseData})
         }catch(err){
             res.status(500).send(err)
         }
    }
}

module.exports = CourseController;
