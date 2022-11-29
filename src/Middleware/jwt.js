const jwt = require("jsonwebtoken");
const createError = require("http-errors");


module.exports = {
    signAccessToken : (userId) =>{
        return new Promise ((resolve,reject) =>{
            const paylod = {}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            // console.log(secret);
            const option = {
                expiresIn : "7d",
                issuer : "tatva.in",
                audience: [userId]
            };
            jwt.sign(paylod,secret,option,(err,token) =>{
                if(err){
                    reject(createError.InternalServerError());
                }else{
                    resolve(token);
                }    
            })
        })
    },
    signRefereshToken : (userId) =>{
        return new Promise ((resolve,reject) =>{
            const paylod = {}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            // console.log(secret);
            const option = {
                expiresIn : "1d",
                issuer : "tatva.in",
                audience: [userId]
            };
            jwt.sign(paylod,secret,option,(err,token) =>{
                if(err){
                    reject(createError.InternalServerError());
                }else{
                    resolve(token);
                }    
            })
        })
    },
    verifyAccessToken: (req,res,next)=>{
        if(!req.headers['authorization']) res.send(createError.Unauthorized());
        // console.log("verify token",req.headers.authorization);
        const token = req.headers.authorization;
        try{
            const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            // console.log(req.params);
            if(decode.aud[0]){
                req.createdBy =  decode.aud[0];
                next();
            }else{
                res.status(401).send(createError.Unauthorized());
            }
        }catch(err){
            console.log("Error",err);
            
            res.status(401).send({error : "Authentication failed"});
        }
    },
    verifyAdminToken : (req,res,next)=>{
        if(!req.headers['authorization']) res.send(createError.Unauthorized());
        const token = req.headers.authorization.split(' ')[1];
        // console.log("verify token",token);
        try{
            const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            // console.log(req.params);
            if(decode.aud[0]){
                next();
                return decode.aud[0];
            }else{
                res.send(createError.Unauthorized());
            }
        }catch(err){
            console.log("Error",err);
            res.send(createError.Unauthorized());
        }
    }
}