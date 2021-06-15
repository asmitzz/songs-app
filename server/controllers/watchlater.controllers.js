const Users = require('../models/users.model');

const handleWatchLater = async(req, res) => {
    const {uid,videoID} = req.params;
    const user = await Users.findOne({_id:uid});
 
    if(user.watchLater.find(vid => vid == videoID)){
        await user.watchLater.remove(videoID);
        await user.save(async(err,user) => {
           const {watchLater} = await user.execPopulate({path:"watchLater",populate:"videos"});
           if(user){
             return res.status(200).json({success: true,watchLater,message:"video removed successfully"});
           }
           if(err){
             return res.status(500).json({success:false,message:"Internal server error"});
           }
        });
        return;
    }
 
    user.watchLater.push(videoID);
    await user.save(async(err,user) => {
       if(err){
          return res.status(404).json({success:false,message:"video is not added"})
       }
       if(user){
         const {watchLater} = await user.execPopulate({path:"watchLater",populate:"videos"});
         res.status(200).json({success:true,watchLater,message:"video added successfully"})
       }
    });
 }

 module.exports = {handleWatchLater};