const { Schema, default: mongoose } = require("mongoose");
const commentSchema = new Schema({
  comments: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  postUserId: { type: mongoose.Types.ObjectId, ref: "post", required: true },
});
const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
