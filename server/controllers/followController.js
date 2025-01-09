const userModel = require("../models/userSchema");
const follow = async (req, res) => {
  const { followingUserId, followerUserId } = req.body;
  if (followingUserId === followerUserId) res.send("cannot follow yourself");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followerUserId,
      },
    }),
      await userModel.findByIdAndUpdate(followerUserId, {
        $addToSet: {
          followers: followingUserId,
        },
      });
    res.send("follow user");
  } catch (error) {
    res.send(error);
  }
};
module.exports = follow;
