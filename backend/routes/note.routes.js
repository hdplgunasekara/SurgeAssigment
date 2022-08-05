const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let Note = require("../models/note");

router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const userid = req.body.userid;
    
   

    const newNote = new Note({
        
       
        title,
        description,
        userid,
        status:"Active"
    })

    newNote.save().then(()=>{
        res.json("Note Added")
    }).catch((err)=>{
        console.log(err);
    })
})



router.route("/").get((req,res)=>{
    Note.find().then((note)=>{
        res.json(note)
    }).catch((err)=>{
        console.log(err);
    })
}) 




router.route("/update/:id").put(async(req,res)=>{
    let noteId = req.params.id;
    const{title,description}=req.body;

    const updateNote={
        title,
        description
        
    }
    const update = await Note.findByIdAndUpdate(noteId,updateNote).then(()=>{
        res.status(200).send({status: "Note updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    
 
})


router.route("/deletenote/:id").put(async(req,res)=>{
    let noteId = req.params.id;
    

    const deleteNote={
        status:"Deleted"
        
    }
    const update = await Note.findByIdAndUpdate(noteId,deleteNote).then(()=>{
        res.status(200).send({status: "Note deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting note",error:err.message})
    })
    
 
})



module.exports = router;
