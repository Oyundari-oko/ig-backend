const userModel = require("../models/userSchema");
const unfollow = async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId) res.send("cannot follow yourself");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $unset: {
        following: followedUserId,
      },
    }),
      await userModel.findByIdAndUpdate(followedUserId, {
        $unset: {
          followers: followingUserId,
        },
      });
    res.send("unfollow user");
  } catch (error) {
    res.send(error);
  }
};
module.exports = unfollow;
