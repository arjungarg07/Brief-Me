const User=require("../models/User")

exports.getUserById=(req,res,next,id)=>{
   User.findById(id).exec((err,user)=>{
       if(err||!user){
           res.status(401).json({
               err: "no user found in database"
           })
       }
       req.profile=user;
       next();
   })
}


exports.getUser=(req,res)=>{
   
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    return res.json(req.profile);
    
}

