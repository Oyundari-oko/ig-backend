const { Schema, default: mongoose } = require("mongoose");
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
const likeSchema = new Schema({
  postId: [{ type: mongoose.Types.ObjectId, ref: "posts", required: true }],
  userId: [{ type: mongoose.Types.ObjectId, ref: "users", required: true }],
});

const likeModel = mongoose.model("likes", likeSchema);
module.exports = likeModel;
