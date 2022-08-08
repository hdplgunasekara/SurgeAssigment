const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const  Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


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

const User = mongoose.model("User",userSchema);

const validateEmail = (data) => {
	const schema = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
		
	});
	return schema.validate(data);
};

const validateAll = (data) => {
	const schema = Joi.object({
    firstName: Joi.string()
        .label("First Name") 
        .alphanum()
        .min(3)
        .required(),
    
     lastName: Joi.string()
       .label("Last Name")
        .alphanum()
        .min(3)
        .required(),

    dob: Joi.date()
    .label("Birth Date")
    .required(),

    mobile: Joi.number()
     .label("Mobile Number")
     .required(),


    password: passwordComplexity()
    .label("Password")
    .required(),

    repassword:passwordComplexity()
    .label("Confirm Password")
    .required(),
       
		
	});
	return schema.validate(data);
};


module.exports = {User,validateEmail,validateAll};

