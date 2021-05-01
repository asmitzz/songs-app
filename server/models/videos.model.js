const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
   videoID:{
       type:String,
       required:true
   },
   title:{
       type:String,
       required:true,
       trim:true
   },
   url:{
       type:String,
       required:true,
       trim:true
   },
   releasedDate:{
       type:String,
       required:true,
       trim:true
   },
   views:{
       type:Number,
       default:0
   },
   like:{
       type:Number,
       default:0
   },
   dislike:{
      type:Number,
      default:0
   }
},{timestamps:true});

module.exports = mongoose.model("Video",videoSchema);