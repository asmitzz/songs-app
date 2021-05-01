const Videos = require("../models/videos.model");
const Category = require("../models/category.model");

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

module.exports = {getAllVideos, getVideosByCategory};