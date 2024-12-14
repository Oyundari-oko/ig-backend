const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const logIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const response = await mongoose.collection("users").findOne({
    email,
  });
  console.log(response);

  if (!response) {
    res.status(404).send("User not founded");
  }
  const hashpassword = response.password;
  const valid_pass = await bcrypt.compare(password, hashpassword);
  console.log(valid_pass);
  if (valid_pass) {
    res.send(response);
  } else {
    res.send("password and email is wrong");
  }
};
module.exports = logIn;
