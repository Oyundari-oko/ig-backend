const Router = require("express");
const like = require("../controllers/likeController");
const likeRoute = Router();
likeRoute.post("/post/like", like);
module.exports = likeRoute;
