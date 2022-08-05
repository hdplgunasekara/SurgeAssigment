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

module.exports = Note;

