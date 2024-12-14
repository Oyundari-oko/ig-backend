// const userModel = require("../models/userSchema");
const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
const like = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const likePost = await likeModel.create({ userId, postId });
    const likeRes = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        liked: likePost,
      },
    });
    res.send(likeRes);
  } catch (error) {
    res.send(error);
  }
};
module.exports = like;
