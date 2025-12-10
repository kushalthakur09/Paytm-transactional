const jwt = require("jsonwebtoken");
const {JWT_SECRET}= require("../config/config");

const authMiddleware =(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(403).json({message : "Unauthorized Access Denied"});
        }
        
        const token = authHeader.split(" ")[1];

        const decoded=jwt.verify(token,JWT_SECRET);

        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({message : "Unauthorized Access Denied"});
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({});
    }
}

module.exports={authMiddleware}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTM1NDIwZTg3NzkxNDlkOTQ5ZTFhZWEiLCJpYXQiOjE3NjUwOTc5OTh9.On-ZKTjMc71movuqUdzbHuBXwPwwEaawxaO--2xnmi0