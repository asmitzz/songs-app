const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
   category:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Category"
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
   views:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       }
   ],
   like:[
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
    }
   ],
   dislike:[
    {
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
    }
   ]
},{timestamps:true});

module.exports = mongoose.model("Video",videoSchema);