const express = require('express');
const appRouter = express.Router();
const multerUpload = require('../Config/multer');
const userController = require('../Controller/userController')
const courseController = require('../Controller/courseController')
const lessonController = require('../Controller/lessonController')

const { signAccessToken, signRefereshToken, verifyAccessToken } = require("../Middleware/jwt");
const { varifyAdmin, varifyFaculty } = require("../Middleware/auth");

// appRouter.route('/test').get((req, res)=>{
//     res.send('done');
// });
/*************** User Routes *******************/
appRouter.route('/user/signup').post(userController.register)
appRouter.route('/user/signin').post(userController.login)
appRouter.route("/user/:id").patch(verifyAccessToken, userController.update)
appRouter.route("/users").get(verifyAccessToken, varifyAdmin, userController.users)
/**************** Course **************** */
appRouter.route("/course/create/:user_id").post(verifyAccessToken,varifyFaculty, courseController.createCourse)

/**************** Lessons**************** */
//appRouter.route('/upload').post(lessonController.uploadFile)
//...

appRouter.route("/lesson/create/:course_id",).post(varifyFaculty, multerUpload, lessonController.createLesson);
  
  //...
  

module.exports = appRouter;