const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const  Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
    _id: Number,

    firstname :{
        type : String,
        required : true
        
    },
    lastname :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    dateofbirth : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    accounttype : {
        type : String,
        required : true
    },

    
    

});

userSchema.plugin(AutoIncrement);
userSchema.methods.generateAuthToken = function(){
    const token = jsonwebtoken.sign({_id:this.id},process.env.JSONWTPRIVATEKEY,{expiresIn:"3d"})
    return token
};


const User = mongoose.model("User",userSchema);

module.exports = User;

