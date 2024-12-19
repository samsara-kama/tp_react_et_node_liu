const bcrypt = require("bcryptjs");
const User = require("../Models/userModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    

    await user.save();
    console.log("ok")
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const Login =async (req,res) => {
    console.log(req.body)
    try{
        const user = await User.findOne({email:req.body.email})
      

        if(!user){
            return res.status(400).send("User not found");
        }
        
        
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(400).send("Password incorrect");
        }
       

        const token =jwt.sign(
            { id: user._id, email: user.email }, // payload : chargement des données à transporter
            process.env.JWT_SECRET, // clé secrète pour protéger le token
            { expiresIn: process.env.JWT_EXPIRES_IN } // les options du token, en locurrence la durée de validité
        )
        console.log(token)

        res.status(200).send({message:"Connected",token});
    }
    catch(error){
        res.status(500).send({message:error.message});

    };
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }
    res.status(200).send({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.username) {
      filter.username = { $regex: req.query.username, $options: "i" };
    }

    const users = await User.find(filter).select("-password");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { registerUser, Login, updateUser, deleteUser, getUsers };

