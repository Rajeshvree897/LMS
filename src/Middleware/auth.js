const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch');
const createError = require("http-errors");

module.exports = { 
    varifyAdmin : async (req, res, next) =>{
        try{
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.role == "admin"){
                next();
            }else{
                    res.status(401).send(createError.Unauthorized());    
            }
        }catch(err){
            console.log("Error",err);
            res.send(createError.Unauthorized());
        }
    },
    varifyFaculty : async (req, res, next) =>{
        try{
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.role == "feculty" || user.role == "admin"){
                next();
            }else{
                    res.status(401).send(createError.Unauthorized());    
            }
        }catch(err){
            console.log("Error",err);
            res.send(createError.Unauthorized());
        }
    }
}
