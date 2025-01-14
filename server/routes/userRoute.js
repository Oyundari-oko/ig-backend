const Router = require("express");
const userModel = require("../models/userSchema");
const signUpUser = require("../controllers/userController");
const follow = require("../controllers/followController");
const unfollow = require("../controllers/unfollowController");
const logIn = require("../controllers/login");
// const userPost = require("../controllers/userPostController");
const userRoute = Router();
userRoute.post("/signUp", signUpUser);
userRoute.get("/signUpUser", async (req, res) => {
  try {
    const response = await userModel
      .find()
      .populate("username", "email profileImg post followers following");
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

userRoute.post("/login", logIn);
userRoute.get("/loginUser/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await userModel
      .findById(userId)
      .populate("email", "username profileImg post followers following");
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
userRoute.get("/user/post", async (req, res) => {
  try {
    const response = await userModel
      .find()
      .populate("post", "postImg caption comments");
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

userRoute.get("/user/post/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await userModel
      .findById(userId)
      .populate("post", "postImg caption comments");
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

userRoute.post("/user/following", follow);
userRoute.get("/user/followers/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await userModel.findById(userId).populate("followers");
    res.status(200).json(followers.followers);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoute.get("/user/following/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await userModel.findById(userId).populate("following");
    res.status(200).json(following.following);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoute.post("/user/unfollow", unfollow);

module.exports = userRoute;
