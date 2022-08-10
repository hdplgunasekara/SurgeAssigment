const mongoose = require('mongoose');
let {User} = require('../models/user');


const URL='mongodb://mongodb:27017/surgeassignment_db';

const newUser = new User({ 
    _id:0,             
    firstname:"Pasindu",
    lastname:"Lakshan",
    email:"admin@gmail.com",
    dateofbirth:"2010-10-09",
    mobile:"0773245322",
    status:true,
    password:"$2b$10$cTO.VoDNCZzV1RpZweds9eg9rIpFXld0CQ.ZcmZnKKSO5Efd3vvgi",
    accounttype:"Admin"
})


const SeedDB = async () =>{

    await User.insertMany(newUser);

}


mongoose.connect(URL,{
  
   useNewUrlParser:true,
   useUnifiedTopology:true,

}).then(()=>{  
    console.log("MongoDB Connected");
    SeedDB().then(()=>{
        console.log("Data Seeded Successfully");
        mongoose.connection.close();
    }).catch(()=>{
        console.log("Data Seeding Failed");
        mongoose.connection.close();
    })

}).catch((err)=>{
    console.log("MongoDB Not Connected");
})

