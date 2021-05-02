const Users = require('../models/users.model');

const addToHistory = async(req, res) => {
    const {uid,videoID} = req.params;
    const user = await Users.findOne({_id:uid});
 
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

 module.exports = {addToHistory,removeFromHistory}