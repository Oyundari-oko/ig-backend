const postModel = require("../models/postSchema");
const commentModel = require("../models/commentSchema");
const comment = async (req, res) => {
  const { comments, userId, postUserId } = req.body;
  const createComment = await commentModel.create({
    comments,
    userId,
    postUserId,
  });
  await postModel.findByIdAndUpdate(postUserId, {
    $push: {
      comments: createComment,
    },
  });

  const result = await postModel.findById(postUserId).populate("comments");

  res.send(result.comments);
};
module.exports = comment;
