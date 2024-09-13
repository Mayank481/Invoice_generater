const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger/logger");

module.exports.signUp = async (req, res) => {
  try {
    const payload = req.body;
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);
    const user = await User(payload).save();
    logger.info("User Register Successfully :)");
    return res.status(200).json({
      message: "User Register Successfully :)",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somethings went wrong. Please try again later",
      error: error,
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        logger.error("Error in Password");
        return res.status(401).json({
          message: "Invalid credentials",
          error
        });
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      logger.info("User Login Successfully :)");
      return res.status(200).json({
        message: "Login Successfully",
        access_token: `Bearer ${token}`,
      });
    }
    logger.error("Invalid Credentials");
    return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something wants wrong :(",
      error: error,
    });
  }
};
