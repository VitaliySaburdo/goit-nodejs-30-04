const {
  checkUser,
  // addUser,
  recordToken,
  updateSubUser,
} = require("../models/users");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Users = require("../service/schemas/users");
const path = require("path");
const fs = require("fs/promises");

// const formatAvatar = require("../helpers/formatAvatar");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("contr", req.body);
    const result = await checkUser({ email: email });
    if (result) {
      return res.status(409).json({ message: "Email in use" });
    }
    const avatarURL = gravatar.url(email);

    const newUser = new Users({
      ...req.body,
      avatarURL,
    });
    await newUser.hashPassword(password);

    const payload = { id: newUser.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    newUser.token = token;
    newUser.save();
    console.log(newUser);
  
    res.json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await checkUser({ email: email });
    if (!result) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const passCompare = await result.comperePassword(password);
    if (!passCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = { id: result._id, name: result.name };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await recordToken(result._id, token);
    res.json({
      token,
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await recordToken(req.user.id, null);
    req.user = null;
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await checkUser({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.json({
      ...user
    });
  } catch (error) {
    next(error);
  }
};

const patchSubscription = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).includes("subscription")) {
      return res.status(400).json({ message: "missing field subscription" });
    }
    console.log({ subscription: req.body.subscription });
    const result = await updateSubUser(req.user.id, {
      subscription: req.body.subscription,
    });
    if (result) {
      return res.json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const patchAvatar = async(req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await Users.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register,
  login,
  logout,
  current,
  patchSubscription,
  patchAvatar
};
