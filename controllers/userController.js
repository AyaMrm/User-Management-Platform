const User = require("../models/User");

// creer un user 
const createUser = async(req, res) =>{
    try{
        const{username, email, password, role} = req.body;

        const newUser = new User({
            username, 
            email, 
            password, 
            role, 
        });

        await newUser.save();
        res.status(201).json({message:'user created with success', newUser});
    }catch(error){
        res.status(500).json({message:'Error lors de la creation du user !', error});
    };
}

module.exports ={ createUser};