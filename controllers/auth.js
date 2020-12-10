const User=require("../models/User");
const jwt = require("jsonwebtoken");
const passport=require("passport");
const expressJwt=require("express-jwt");
const { check, validationResult } = require('express-validator');

exports.signup=(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ 
      errors: errors.array()[0].msg
     });
  }
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

  
exports.signin= (req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ 
      errors: errors.array()[0].msg
     });
  }
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json(info.message)
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //create cookie
    res.cookie("token",token,{
      expire:new Date()+9999
    });
    const {_id,name,email}=user;
    return res.json({
      token,
      user:{_id,name,email}});

    })(req, res, next);
}
  


exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User Signout Sucess"
    })
};


//protected routes
exports.isSignedIn = expressJwt({
  secret : process.env.SECRET,
  userProperty: "auth",
  algorithms: ['RS256']
});


//custom middlewares
exports.isAuthenticated = (req,res,next)=>{
  let checker =req.profile&&req.auth&&req.profile._id==req.auth._id
  if(!checker){
    res.status(403).json({
      error:"ACCESS DINIED"
    })
  }
  next();
};