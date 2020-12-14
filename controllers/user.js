const User=require("../models/User")

function getUserById(req,res,next,id) {
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


function getUser(req,res){
   
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    return res.json(req.profile);
    
}
module.exports={getUser,getUserById}
