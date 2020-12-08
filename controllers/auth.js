const User=require("../models/User");

const jwt = require("jsonwebtoken");
const expressJwt=require("express-jwt");

exports.signup=(req,res)=>{
    const user=new User(req.body);

    user.save((err,user)=>{
        if(err){
            return res.status(404).json({
                error:"NOT able to STORE"
            })
        }
        res.json(user);
    })
}

exports.signin=(req,res)=>{
    const {email,password}=req.body;

    User.findOne({emial},(err,user)=>{
        if(err||!user){
            return res.status(404).json({
                error:"USER EMAIL doesn't exit "
            })
        }
        if(!user.authentiacte(password)){
            return res.status(404).json({
                error:"email and password DOESN'T match"
            })
        }
        //creating token 
        //process.env.SECRET needs to set in the .env file 
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",token,{expire: new Date()+999})
        //sending response to frontend
        const {_id,name,email}=user;
        return res.json({
            token,
            uesr:{_id,name,email}
        });
    })

}
exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User Signout Sucess"
    })
};

