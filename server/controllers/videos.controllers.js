const Videos = require("../models/videos.model");
const Category = require("../models/category.model");

const getVideosByCategory = async(req, res) => {
    const videosByCategory = await(await Category.find({}));

    for(let i=0; i < videosByCategory.length; i++) {
        await videosByCategory[i].execPopulate({path:"videos",populate:"videos"});
    }

    res.status(200).json({success:true,videosByCategory})
}

const getAllVideos = async(req, res) => {
    const allVideos = await Videos.find({});
    res.status(200).json({success:true,allVideos})
}

module.exports = {getAllVideos, getVideosByCategory};