const Router = require("express");
const like = require("../controllers/likeController");
// const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
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
module.exports = likeRoute;
