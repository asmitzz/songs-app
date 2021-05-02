const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true,
       trim:true
   },
   email:{
       type:String,
       required:true,
       trim:true,
       unique:true
   },
   password:{
      type:String,
      required:true,
      trim:true
   },
   history:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Video"
   }],
   watchLater:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Video"
   }],
   playlists:[
       {
           name:{ 
               type:String,
               required:true,
               trim:true
           },
           videos:[{
               type:mongoose.Schema.Types.ObjectId,
               ref:"Video"
           }]
       }
   ]
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);