const postModel = require("../models/postSchema");
const post = async (req, res) => {
  try {
    const { caption, postImg, userId } = req.body;
    console.log(req.body);
    const response = await postModel.create({ caption, postImg, userId });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = post;
