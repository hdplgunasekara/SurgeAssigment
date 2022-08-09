const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let {User,validateEmail,validateAll} = require("../models/user");
var generator = require('generate-password');
const sendEmail = require("../utils/sendmail");
const jwt =require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();
const auth = require('../middleware/auth.js');

let refreshTokens=[]; 

//register using email
router.post("/register", async (req, res) => {
    const email = req.body.email;
	try {

        const { error } = validateEmail(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		
		var password = generator.generate({
			length: 10,
			numbers: true
		});

		let user = await User.findOne({ email: email });
		if (user){
			return res.status(409).send({ message: "User with given email already Exist!" });
        }

       
	    const message=`This is your login link /n This is your temporary password-${password}`;
	    
        await sendEmail(email, "Your Login Link With Password", message)
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
        
            firstname:"Undifiend",
            lastname:"Undifiend",
            email:email,
            dateofbirth:"Undifiend",
            mobile:"Undifiend",
            status:false,
            password:hashPassword,
            accounttype:"Student"
             
          })

		newUser.save()
		
		res
		.status(201)
		.send({ message: "An Email sent to user account with password" });
	} catch (error) {
		
		res.status(500).send({ message: "Server Error" });
	}
});


// Login authentication


router.post('/login', async (req,res)=>{
    const email= req.body.email;
    const password = req.body.password;

   try {
    const user = await User.findOne({ email: email });
    if (!user)
        return res.status(401).send({ message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword)
        return res.status(401).send({ message: "Incorrect Password " });


     const tokendetails= {email:user.email,type:user.accounttype,status:user.status};
     const accessToken=jwt.sign(tokendetails,process.env.TOKEN_KEY,{expiresIn: '1d'});
     const refreshToken= jwt.sign(tokendetails,process.env.RE_TOKEN_KEY,{expiresIn: '2d'});
     refreshTokens.push(refreshToken);

     const data = {
        id: user._id,
        email: user.email,
        accesstoken: accessToken,
        refreshtoken: refreshToken,
        permissionlevel: user.accounttype,
        status:user.status
    };

     res.send(data);


   } catch (error) {

    res.status(500).send({ message: "Internal Server Errorr" });
    
   }
  
  

   
   
})


router.post('/token',(req,res)=>{
   const refreshToken = req.body.refreshToken;
   if(refreshToken==null) res.sendStatus(401);
   if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
   jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
      if(err) res.sendStatus(403);
      const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '1s'});
      res.send({accessToken});
   });
});


//fetch users start (with pagination)

router.get("/users",auth, async (req, res) => {

	try {
		
        let {page, size ,search}=req.query       

        if(!page){
            page=1;
        }
        if(!size){
            size=5;
        }
        
        const limit = parseInt(size);
        const skip = (page-1)*size;

        if(search==null||search===""){

            const users = await User.find().limit(limit).skip(skip);      
            res.send(users);
            
        }else{
            
            const users = await User.find({
            $or: [{ firstname: { $regex: search, $options: "i" }},{lastname: { $regex: search, $options: "i" }},{email: { $regex: search, $options: "i" }}],
            }).limit(limit).skip(skip);      
            res.send(users);
        }

     


	} catch (error) {
		res.sendStatus(500).send({ message: "Internal Server Error" });
	}
});

//fetch user end


//profile complete start

router.put("/completeprofile/:id",auth, async (req, res) => {
    const Id = req.params.id
    
	try {

  
        const { error } = validateAll(req.body);
     
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        if(req.body.password!=req.body.repassword)
            return res.status(400).send({ message: "Password and Confirm password must be match" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
       

        const updateUser={
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            dateofbirth:req.body.dob,
            mobile:req.body.mobile,
            password:hashPassword,
            status:true
            
        }

        
       
         await User.findByIdAndUpdate(Id,updateUser).then(()=>{
            res.status(200).send({status: "Successful"})
        })
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error"});
	}
});

//profile complete end




module.exports = router;
