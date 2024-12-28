const postModel = require("../models/postSchema");
const unlike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const unlikePost = await postModel.findOneAndDelete({ userId, postId });
    console.log("first", unlikePost);
    const unlikeRes = await postModel.findByIdAndUpdate(postId, {
      $pull: {
        liked: unlikePost._id,
      },
    });
    console.log({ unlikePost, unlikeRes });
    res.send("unlike post");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = unlike;
