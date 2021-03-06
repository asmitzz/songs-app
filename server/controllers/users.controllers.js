const Users = require('../models/users.model');
const md5 = require('md5');

const signup = async(req, res) => {
   const {name,email,password} = req.body;

   try {
      const checkemail = await Users.findOne({email}).lean();
      if(checkemail){
         return res.status(409).json({
            message: "Email address is already registered"
         })
      }
      await Users({name,email,password:md5(password)}).save();
      res.status(200).json({
         message: "Email address is registered successfully"
      });
   } catch (error) {
          res.status(409).json({
            message: "Email address is already registered"
         })
   }
}

const login = async(req,res) => {
   try {
      const email = await Users.findOne({email:req.body.email}).lean();
      const password = await Users.findOne({password:md5(req.body.password)}).lean();

      if(email){
         if(password){
            return res.status(200).json({ 
               name:email.name,
               email:email.email,
               uid: email._id,
            })
         }
         else{
          return res.status(401).json({ message: "Incorrect password"})
         }
      }

      res.status(404).json({
         message:"Email address is not registered"
      })
     
   } catch (error) {
      if(error){
         res.status(404).json({
            message: "Something went wrong with server"
         })
      }
   }
}

const checkUser = async(req, res, next,uid) => {
   const user = await Users.findOne({_id:uid},{password:0,createdAt:0,updatedAt:0,__v:0}).lean()
   .populate({path:"history",model:"Video"})
   .populate({path:"watchLater",model:"Video"})
   .populate({ path:"playlists",populate:{path:"videos",model:"Video"} });

   if(user){
      req.user = user;
      next();
      return;
   }
   res.status(404).json({message:"User not found"});
}

const getUser = (req, res) => {
   const {user} = req;
   if(user){
      return res.status(200).json({success:true,user})
   }
}

module.exports = { signup,login,getUser,checkUser };