const postModel = require("../models/postSchema");
const commentModel = require("../models/commentSchema");
const comment = async (req, res) => {
  const { comments, userId, postUserId } = req.body;
  const createComment = await commentModel.create({
    comments,
    userId,
    postUserId,
  });
  const result = await postModel.findByIdAndUpdate(postUserId, {
    $push: {
      comments: createComment,
    },
  });
  res.send("create comment to Post");
};
module.exports = comment;
