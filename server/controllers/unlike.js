const postModel = require("../models/postSchema");
const unlike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const unlikePost = await postModel.findOneAndDelete({ userId, postId });
    const unlikeRes = await postModel.findByIdAndUpdate(postId, {
      $pull: {
        liked: unlikePost._id,
      },
    });
    res.send("unlike post");
  } catch (error) {
    res.send(error);
  }
};
module.exports = unlike;
