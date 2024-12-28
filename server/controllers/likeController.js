const postModel = require("../models/postSchema");
const like = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const likeRes = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        liked: userId,
      },
    });
    res.send(likeRes);
  } catch (error) {
    res.send(error);
  }
};
module.exports = like;
