const Course = require('../Model/lessonSchema')
const fs = require('fs');
const cloudinary = require('../Config/cloudnary');
const Lesson = require('../Model/lessonSchema');
const lessonController = {
    createLesson : async (req, res) => {
        const {title, description} = req.query
        if(!(title && description)){
            res.status(400).send("All Inputs is required")
        }
        const upload = req.multerfile
        upload(req, res, (err) => {
          if (err) {
            return res.send(err);
          }
      
          // SEND FILE TO CLOUDINARY
          const { path } = req.file; // file becomes available in req at this point
          console.log(req.file);
          const fName = req.file.originalname.split(".")[0];
          cloudinary.uploader.upload(
            path,
            {
              resource_type: "video",
              public_id: `lessons/${req.params.course_id}/${fName}`,
              chunk_size: 6000000,
              eager: [
                {
                  width: 300,
                  height: 300,
                  crop: "pad",
                  audio_codec: "none",
                },
                {
                  width: 160,
                  height: 100,
                  crop: "crop",
                  gravity: "south",
                  audio_codec: "none",
                },
              ],
            },
      
            // Send cloudinary response or catch error
            (err, video) => {
                console.log('here')
              if (err) return res.send(err);
      
              fs.unlinkSync(path);
              try{
                let course_id = req.params.course_id;
                req.query.course_id = course_id
                req.query.cloudnary_id = video.public_id
                req.query.url = video.secure_url
                 const lessonData =  new Lesson(req.query)  
                 const lesson =  lessonData.save();
                 res.status(200).json({lesson: lessonData})
             }catch(err){
                 res.status(500).send(err)
             }
              //return res.send(video);
            }
          );
        });
      }
}
module.exports = lessonController