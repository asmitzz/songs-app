const Users = require('../models/users.model');

const checkUser = async(req,res,next,uid) => {
    const user = await Users.findById(uid);
    if(!user){
        return res.status(404).json("user not found");
    }
    req.user = user;
    next();
}

const createPlaylist = async(req, res) => {
    const {user} = req;
    const {name} = req.body;
    user.playlists.push({name,videos:[]})
    await user.save((err,user) => {
       if(user){
         res.status(200).json({success:true,playlists:user.playlists,message:"playlist created successfully"})
       }
       if(err){
        return res.status(500).json({success:false,message:"something went wrong with server"})
       }
    });
}

const deletePlaylist = async(req, res) => {
    const {user} = req;
    const {playlistID} = req.params;
    user.playlists = user.playlists.filter( playlist => playlist._id != playlistID);
    await user.save((err,user) => {
        if(user){
            res.status(200).json({success:true,playlists:user.playlists,message:"playlist deleted successfully"})
        }
        if(err){
            return res.status(500).json({success:false,message:"something went wrong with server"})
        }
    });
}

const addToPlaylist = async(req,res) => {   
    const {user} = req;
    const {playlistID,videoID} = req.params;

    user.playlists = user.playlists.map(playlist =>{
        if(playlist._id == playlistID){
            playlist.videos.push(videoID)
            return playlist;
        }
        return playlist;
    })

    await user.save(async(err, user) =>{
        if(user){
            const {playlists} = await user.execPopulate({path:"playlists",populate:{path:"videos",populate:"videos"}});
            res.status(200).json({success:true,playlists,message:"video added successfully"});
        }
        if(err){
            return res.status(500).json({success:false,message:"something went wrong with server"})
        }
    });    
}

const removeFromPlaylist = async(req,res) => {   
    const {user} = req;
    const {playlistID,videoID} = req.params;

    user.playlists = user.playlists.map(playlist =>{
        if(playlist._id == playlistID){
            playlist.videos.remove(videoID)
            return playlist;
        }
        return playlist;
    })

    await user.save(async(err, user) =>{
        if(user){
            const {playlists} = await user.execPopulate({path:"playlists",populate:{path:"videos",populate:"videos"}});
            return res.status(200).json({success:true,playlists,message:"video removed successfully"});
        }
        if(err){
           return res.status(500).json({success:false,message:"something went wrong with server"})
        }
    });    
}

module.exports = {checkUser,createPlaylist,deletePlaylist,addToPlaylist,removeFromPlaylist};