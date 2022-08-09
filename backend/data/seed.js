const mongoose = require('mongoose');
let {User} = require('../models/user');


const URL='mongodb+srv://itp2022:itp2022@cluster0.sqoif.mongodb.net/surgeassigment_db?retryWrites=true&w=majority';

const newUser = new User({              
    firstname:"Pasindu",
    lastname:"Lakshan",
    email:"pasindu@gmail.com",
    dateofbirth:"2010-10-09",
    mobile:"0773245322",
    status:true,
    password:"hashPassword",
    accounttype:"Admin"
})


const SeedDB = async () =>{
    await User.deleteMany({});
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

