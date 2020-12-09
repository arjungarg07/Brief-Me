const passport =require("passport");
const localStrategy=require("passport-local").Strategy;
const User=require("../models/User");
const passportJwt=require("passport-jwt").ExtractJwt;


const opts={}
opts.jwtFromRequest = passportJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

 passport.use(new localStrategy(
  {
    usernameField:'email',
    passwordField: 'password'
},
function(username,password,done){
    let email=username;
         console.log(`${username}    hell0 123 and ${password}`);
        User.findOne({email},(err,user)=>{
            if(err||!user){
                console.log("error:USER EMAIL DOESNT EXISTS1")
               return  done(err,false,{
                error:"USER EMAIL DOESNT EXISTS"
               })
            }  
            if(!user.authentiacte(password)){
              return  done(err,false,{
                // console.log("error:USER EMAIL DOESNT EXISTS2");
                error:"EMAIL AND PASSSWORD DOESNT MATCH "
               })
            }
             done(null, user);

      })
    }
 ))



