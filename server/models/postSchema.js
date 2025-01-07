const { Schema, default: mongoose } = require("mongoose");
const commentModel = require("../models/commentSchema");
const userModel = require("../models/userSchema");
const postSchema = new Schema({
  caption: { type: String, required: true },
  postImg: [{ type: String, required: true }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  liked: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
});
const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
