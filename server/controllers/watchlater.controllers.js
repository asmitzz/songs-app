const Users = require('../models/users.model');

const handleWatchLater = async(req, res) => {
    const {uid,videoID} = req.params;
    const user = await Users.findOne({_id:uid});
 
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

 module.exports = {handleWatchLater};