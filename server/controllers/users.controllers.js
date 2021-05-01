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

const handleWatchLater = async(req, res) => {
   const {uid} = req.params;
   const user = await Users.findOne({_id:uid});
   const {videoID} = req.body;

   if(user.watchLater.find(vid => vid == videoID)){
       await user.watchLater.remove(videoID);
       await user.save();
       return res.status(200).json({success: true,message:"video removed successfully"});
   }

   user.watchLater.push(videoID);
   await user.save((err,result) => {
      if(err){
         return res.status(404).json({success:false,message:"video is not added"})
      }
      res.status(200).json({success:true,message:"video added successfully"})
   });
}

const addToHistory = async(req, res) => {
   const {uid} = req.params;
   const user = await Users.findOne({_id:uid});
   const {videoID} = req.body;

   if(user.history.find(vid => vid == videoID)){
       await user.history.remove(videoID);
       user.history.push(videoID);
       await user.save();
       return res.status(200).json({success: true,message:"video added successfully"});
   }

   user.history.push(videoID);
   await user.save((err,result) => {
      if(err){
         return res.status(404).json({success:false,message:"video is not added"})
      }
      res.status(200).json({success:true,message:"video added successfully"})
   });
}

const removeFromHistory = async(req, res) => {
   const {uid,videoID} = req.params;
   const user = await Users.findOne({_id:uid});
   await user.history.remove(videoID);
   await user.save();
   res.status(200).json({success:true,message:"video removed successfully"})
}

module.exports = { signup,login,getUser,checkUser,handleWatchLater,addToHistory,removeFromHistory };