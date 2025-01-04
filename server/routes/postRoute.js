const Router = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const comment = require("../controllers/createCommentController");
const commentModel = require("../models/commentSchema");
const authMiddleware = require("../middlewares/authToken");
const like = require("../controllers/likeController");
const unlike = require("../controllers/unlike");
const userPost = Router();

userPost.post("/post/creat", async (req, res) => {
  const { caption, postImg, userId } = req.body;
  const createPost = await postModel.create({
    caption,
    postImg,
    userId,
  });
  const result = await userModel.findByIdAndUpdate(userId, {
    $push: {
      post: createPost._id,
    },
  });
  res.send(result);
});
userPost.post("/commented/post", comment);

userPost.get("/comments", async (req, res) => {
  const getComment = await commentModel
    .find()
    .populate("userId", "email username _id");
  res.send(getComment);
});

userPost.get("/posts", authMiddleware, async (req, res) => {
  console.log("working");
  try {
    const posts = await postModel
      .find()
      .populate("userId", "email username _id");
    res.send(posts);
  } catch (error) {
    res.status(404).json({ message: `failed to get posts, ${error}` });
  }
});

userPost.get("/post/postId", async (req, res) => {
  const { postUserId } = req.query;
  const response = await postModel.find(postUserId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImg",
    },
  });
  res.send(response);
});

userPost.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentModel
      .find({ postUserId: postId })
      .populate("userId");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

userPost.post("/post/like", like);
userPost.get("/like/postId", async (req, res) => {
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
userPost.get("/like/likedUser/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId).populate("liked");

    res.status(200).json(post.liked);
  } catch (error) {
    res.status(500).send(error);
  }
});
userPost.post("/post/unlike", unlike);
module.exports = userPost;
