const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let {Note,validateNote} = require("../models/note");
const auth = require('../middleware/auth.js');


//add notes start 
 
router.post("/add/:userid",auth, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const userid =req.params.userid;
	try {

        const { error } = validateNote(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });


            const newNote = new Note({
               
                title,
                description,
                userid:userid,
                status:"Active"
            })

		newNote.save()
		
		res
		.status(201)
		.send({ message: "Added Successfull" });
	} catch (error) {
		
		res.status(500).send({ message: "Server Error" });
	}
});

//add notes end

//fetch notes start (with pagination)


router.get("/notes",async (req, res) => {

	try {
		
        let {userid ,page, size}=req.query
        if(!page){
            page=1;
        }
        if(!size){
            size=5;
        }
        
        const limit = parseInt(size);
        const skip = (page-1)*size;
        const count=  await Note.find({status : 'Active', userid:userid}).count();
        const notes = await Note.find({status : 'Active', userid:userid}).limit(limit).skip(skip);
         
        res.send({data: notes, count: parseInt(count/limit)});


	} catch (error) {
		res.sendStatus(500).send({ message: "Internal Server Error" });
	}
});

//fetch notes end

//update note start

router.route("/update/:id").put(auth,async(req,res)=>{
    let noteId = req.params.id;
    const{title,description}=req.body;

    const { error } = validateNote(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

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

//update note end

//delete note start

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

//delete note end

module.exports = router;
