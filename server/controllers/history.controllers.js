const Users = require('../models/users.model');

const addToHistory = async(req, res) => {
    const {uid,videoID} = req.params;
    const user = await Users.findOne({_id:uid});
 
    if(user.history.find(vid => vid == videoID)){
        await user.history.remove(videoID);
        user.history.push(videoID);
        await user.save(async(err,user) => {
            if(user){
               const {history} = await user.execPopulate({path:"history",populate:"videos"});
               return res.status(200).json({success: true,history,message:"video added successfully"});
            }
            if(err){
               return res.status(500).json({success:false,message:"Internal server error"});
            }
        });
        return;
    }
 
    user.history.push(videoID);
    await user.save(async(err,user) => {
       if(err){
          return res.status(505).json({success:false,message:"Internal server error"})
       }
       if(user){
         const {history} = await user.execPopulate({path:"history",populate:"videos"});
         return res.status(200).json({success: true,history,message:"video added successfully"});
       }
    });
 }
 
 const removeFromHistory = async(req, res) => {
    const {uid,videoID} = req.params;
    const user = await Users.findOne({_id:uid});
    await user.history.remove(videoID);
    await user.save(async(err,user)=>{
       if(user){
         const {history} = await user.execPopulate({path:"history",populate:"videos"});
         res.status(200).json({success:true,history,message:"video removed successfully"})
       }
       if(err){
         return res.status(505).json({success:false,message:"Internal server error"})
       }
    });
 }

 module.exports = {addToHistory,removeFromHistory}