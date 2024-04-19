const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
     type:String,
     required: true,
    },
    blogId:{
    type: Schema.Types.ObjectId,
     ref: "blog",
    },
    createdBy: {
     type: Schema.Types.ObjectId,
     ref: "user",
    },
 },{timestamps: true}
 );
 
 module.exports = mongoose.model('comment',commentSchema);