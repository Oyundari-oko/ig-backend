// const userModel = require("../models/userSchema");
const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
const like = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const likeRes = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        liked: userI,
      },
    });
    res.send(likeRes);
  } catch (error) {
    res.send(error);
  }
};
module.exports = like;
