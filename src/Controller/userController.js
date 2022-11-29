const bcrypt = require('bcryptjs')
const User = require('../Model/userSchema')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv').config();
const { signAccessToken, signRefereshToken, verifyAccessToken } = require("../Middleware/jwt");
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch');


const userController = {
    register : async function (req ,res) {
        try{
           const {firstname, lastname, email, password} = req.body
           if(!(firstname && lastname && email && password)){
               res.status(400).send("All Inputs is required")
           }
           const oldUser = await User.findOne({email});
           console.log(oldUser)
           if(oldUser){
               return res.status(409).json({message : "already exist"})
           }
           req.body.password = await bcrypt.hashSync(password, 10)
        //    const user = await User.create({
        //        firstname,
        //        lastname,
        //        email,
        //        password : encryptPass,
        //     }) 
            const userData =  new User(req.body)  
            const user = await userData.save();
           const token = jwt.sign({user_id : user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : "2h"
            })
            user.token = token;
            res.status(200).json({user: user})
        }catch(err){
            res.status(500).send(err)
        }
    },
    login : async function(req, res){
        try {
            const result = req.body;
            let user = await User.findOne({ email: result.email });
            if (!user) {
                res.status(400).send("Invalid User");
            } else {
                const compare = await bcrypt.compare(result.password, user.password);
                if (compare) {
                    delete user['password'];
                    const accessToken = await signAccessToken(user._id);
                    const refreshToken = await signRefereshToken(user._id);
                    const success = true;
                    localStorage.setItem('user', JSON.stringify(user));
                    res.status(200).send({ user, accessToken, refreshToken, success });
                } else {
                    res.status(400).send("invalid Username/Password");
                }
    
            }
        } catch (err) {
            // if (err.isJoi === true) {
            //     res.status(400).send("invalid Username/Password");
            //     console.log(err);
            // } else {
                res.status(400).send("Something went wrong");
                console.log(err);
            // }
            // console.log(err);
            // res.send(err);
        }
    },
    update : async function(req, res, next){
        try {
            let _id = req.params.id;
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            const updateData = await User.findByIdAndUpdate(_id, req.body);
            res.status(200).send(updateData);
    
        } catch (err) {
            if (err.stringValue === "\"NaN\"") {
                res.status(400).send({ Error: "Invalid URL" });
            } else {
                res.status(400).send(err);
            }
            console.log(err);
        }
    },
    users : async function(req,res, next){
        try{
            const allUsers  = await User.find()
            res.status(200).json(allUsers)
        }catch(err) {
            res.status(400).send(err)
        }
    }
}
module.exports = userController;