const mongoose = require('mongoose');
const {Schema} = require('mongoose');
// const {createHmac,randomBytes} = require("crypto");

const BlogSchema = new mongoose.Schema({
   title: {
    type:String,
    required: true,
   },
   body: {
    type:String,
    required: true,
   },
   coverImageURL: {
    type:String,
    required:false,
   },
   createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
   },

},{timestamps: true}
);

module.exports = mongoose.model('blog',BlogSchema);