const Router = require("express");
const like = require("../controllers/likeController");
// const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
const likeModel = require("../models/likeSchema");
const likeRoute = Router();
likeRoute.post("/post/like", like);
likeRoute.get("/like/postId", async (req, res) => {
  const { postId } = req.query;
  const getLike = await postModel.find(postId).populate({
    path: "liked",
    populate: {
      path: "userId",
      select: "username profileImg",
    },
  });
  res.send(getLike);
});
likeRoute.get("/like/likedUser/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const like = await likeModel.find({ postId: postId }).populate("userId");
    res.status(200).json(like);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = likeRoute;
