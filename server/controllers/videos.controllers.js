const Videos = require("../models/videos.model");
const Category = require("../models/category.model");

const checkVideo = async(req,res,next,videoID) => {
    const video = await Videos.findById(videoID);
    if(!video) {
       return res.status(404).json({success:false,message:"video not found"})
    }
    req.video = video;
    next();
}

const getVideosByCategory = async(req, res) => {
    const videosByCategory = await Category.find({}).populate({
        path:"videos",populate:{ path:"videos",model:"Video" }
    }).lean();

    res.status(200).json({success:true,videosByCategory})
}

const getAllVideos = async(req, res) => {
    const allVideos = await Videos.find({}).lean();
    res.status(200).json({success:true,allVideos})
}

const updateLike = async(req, res) => {
    const {video} = req;
    const {uid} = req.params;

    const checkUserLikedOrNot = video.like.find( u => u == uid );
    const checkUserDislikedOrNot = video.dislike.find( u => u == uid );

    if(checkUserLikedOrNot){
        video.like.remove(uid);
    }
    else if(checkUserDislikedOrNot){
        video.dislike.remove(uid);
        video.like.push(uid);
    }
    else{
        video.like.push(uid);
    }
    
    await video.save((err,video) => {
       if(video){
        res.status(200).json({success: true,video,message:"likes updated successfully"})
       }
       if(err){
           res.status(500).json({success:false,message:"not able to update"})
       }
    });
}

const updateDislike = async(req,res) => {
    const {video} = req;
    const {uid} = req.params;

    const checkUserDislikedOrNot = video.dislike.find( u => u == uid );
    const checkUserLikedOrNot = video.like.find( u => u == uid );

    if(checkUserDislikedOrNot){
        video.dislike.remove(uid);
    }
    else if(checkUserLikedOrNot){
        video.like.remove(uid);
        video.dislike.push(uid);
    }
    else{
        video.dislike.push(uid);
    }

    await video.save((err,video) => {
       if(video){
        res.status(200).json({success: true,video,message:"dislikes updated successfully"})
       }
       if(err){
           res.status(500).json({success:false,message:"not able to update"})
       }
    });
}

const updateViews = async(req, res) => {
    const {video} = req;
    const {uid} = req.params;

    video.views.push(uid);
    await video.save((err,video) => {
       if(video){
        res.status(200).json({success: true,video,message:"views updated successfully"})
       }
       if(err){
           res.status(500).json({success:false,message:"not able to update"})
       }
    });
}

module.exports = {checkVideo,getAllVideos, getVideosByCategory,updateLike,updateDislike,updateViews};