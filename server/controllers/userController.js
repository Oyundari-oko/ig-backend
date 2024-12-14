const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUpUser = async (req, res) => {
  const { username, password, email } = req.body;
  const saltRounds = 10;
  try {
    const hashpassword = await bcrypt.hash(password, saltRounds);
    const response = await userModel.create({
      username,
      email,
      password: hashpassword,
    });
    const token = jwt.sign(
      {
        userId: response._id,
        username: response.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.send(`not Signup ${error}`);
  }
};
module.exports = signUpUser;
