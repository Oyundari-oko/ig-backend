const { Schema, default: mongoose } = require("mongoose");
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
    post: [{ type: mongoose.Types.ObjectId, ref: "post", required: true }],
    followers: [
      { type: mongoose.Types.ObjectId, ref: "users", required: true },
    ],
    following: [
      { type: mongoose.Types.ObjectId, ref: "users", required: true },
    ],
    liked: [{ type: mongoose.Types.ObjectId, ref: "likes", required: true }],
  },
  { timeStamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
