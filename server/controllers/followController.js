const userModel = require("../models/userSchema");
const follow = async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId) res.send("cannot follow yourself");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    }),
      await userModel.findByIdAndUpdate(followedUserId, {
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
