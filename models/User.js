const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto =require("crypto");
const uuidv1=require("uuid/v1");


const userSchema = new Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	name: String,
	email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
       required:true
    },
    salt:String,
	creationDate: {type: Date},
	lastLogin: {type: Date},
});
userSchema
        .virtual("password")
        .set(function(password){
            this._password=password;
            this.salt=uuidv1();
            this.encry_password=this.securePassword(password);
        })
        .get(function(){
            return this._password;
        })

userSchema.methods={
    authentiacte:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },


    securePassword:function(plainpassword){
        console.log("hello world");
        console.log(plainpassword);
        if(!plainpassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return " ";
        }
    }
}

module.exports = mongoose.model('User',userSchema);