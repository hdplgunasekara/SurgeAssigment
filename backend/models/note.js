const Joi = require('joi');
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const noteSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },

    
    

});


const Note = mongoose.model("Note",noteSchema);

const validateNote= (data) => {
	const schema = Joi.object({
        title: Joi.string()
        .label("Title") 
        .alphanum()
        .min(10)
        .required(),
    
     description: Joi.string()
       .label("Description")
        .alphanum()
        .min(20)
        .required(),
		
	});
	return schema.validate(data);
};

module.exports = {Note,validateNote};

