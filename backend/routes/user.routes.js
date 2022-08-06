const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let User = require("../models/user");
var generator = require('generate-password');
const sendEmail = require("../utils/sendmail");


//register using email
router.post("/register", async (req, res) => {
    const email = req.body.email;
	try {
		
		var password = generator.generate({
			length: 10,
			numbers: true
		});

		let user = await User.findOne({ email: email });
		if (user){
			return res.status(409).send({ message: "User with given email already Exist!" });
        }



        const newUser = new User({
        
          firstname:"Undifiend",
          lastname:"Undifiend",
          email:email,
          dateofbirth:"Undifiend",
          mobile:"Undifiend",
          status:false,
          password:password,
          accounttype:"Student"
           
        })

		// const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(req.body.password, salt);
       
		const message=`This is your login link /n This is your temporary password-${password}`;
	

		newUser.save();
		await sendEmail(email, "Your Login Link With Password", message)
		res
		.status(201)
		.send({ message: "An Email sent to user account with password" });

		// const token = await new Token({
		// 	userId: user._id,
		// 	token: crypto.randomBytes(32).toString("hex"),
		// }).save();
		// const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		// await sendEmail(user.email, "Verify Email", url);

		// res
		// 	.status(201)
		// 	.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Server Error" });
	}
});


// Login authentication








module.exports = router;
