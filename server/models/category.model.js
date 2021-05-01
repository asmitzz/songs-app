const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    type:{
        type:String,
        required:true,
        trim:true
    },
    videos:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Video"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);