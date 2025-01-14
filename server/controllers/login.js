const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const logIn = async (req, res) => {
  const { email, password } = req.body;
  const response = await userModel.findOne({
    email,
  });

  if (!response) {
    res.status(404).send("User not founded");
  }

  try {
    const hashpassword = response.password;
    const valid_pass = await bcrypt.compareSync(password, hashpassword);
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
    res.send(`not Login ${error}`);
  }
};
module.exports = logIn;
