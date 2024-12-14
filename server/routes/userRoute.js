const Router = require("express");
const userModel = require("../models/userSchema");
const signUpUser = require("../controllers/userController");
const follow = require("../controllers/followController");
const unfollow = require("../controllers/unfollowController");
// const logIn = require("../controllers/login");
// const userPost = require("../controllers/userPostController");
const userRoute = Router();
userRoute.post("/signUp", signUpUser);
// userRoute.post("/login", logIn);
userRoute.get("/user/post", async (req, res) => {
  try {
    const response = await userModel
      .find()
      .populate("post", "postImg caption comments");
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
userRoute.post("/user/following", follow);

userRoute.post("/user/unfollow", unfollow);

module.exports = userRoute;
