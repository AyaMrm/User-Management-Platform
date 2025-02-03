const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 


// creer un user 
const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Vérifier si l'email existe déjà dans la BD
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'Email déjà utilisé !!' });
        }

        // Hacher le mot de passe avant de le stocker
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword, // Utilisation du mot de passe haché
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
    }
};


// fonction de login 
const loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body;

        // verifier l'existance d'email dans la BD
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'email ou password incorrect!!'});
        }

        // maintenant verifier si la password est juste ou non 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message:'email ou password incorrect!!'});
        }
        // si tout est correcte on va generer un token 
        const token = jwt.sign({id: user._id, role: user.role}, 'tonSecretKey', {expiresIn: '1h'});

        // retourn de la reponse 
        res.status(200).json({message:'Login reussi !!', token});
    }catch(error){
        res.status(500).json({message:'Error lors de la connexion!!'}, error);
    }
}

module.exports ={createUser, loginUser};