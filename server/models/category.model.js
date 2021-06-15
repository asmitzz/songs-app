const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        default:[]
    }]
},{timestamps:true});

module.exports = mongoose.model("Category", categorySchema);