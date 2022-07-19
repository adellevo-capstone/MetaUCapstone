const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { promisify } = require("util");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = 14 * 1000 * 60 * 60 * 24;
const NODE_ENV = process.env.NODE_ENV;

// JWT

const decryptJwt = async (token) => {
  const jwtVerify = promisify(jwt.verify);
  return await jwtVerify(token, JWT_SECRET);
};

const signJwt = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_NUM,
  });
};

const sendToken = (user, statusCode, req, res) => {
  const token = signJwt(user._id);
  const options = {
    expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
    secure: NODE_ENV === "prodution" ? true : false,
    httpOnly: NODE_ENV === "production" ? true : false,
  };
  res.cookie("jwt", token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const encryptPw = async (password) => {
  return await bcrypt.hash(password, 12);
};

// API

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.user = await User.findById(decodedToken.id);
        next();
      }
    });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const pw = await encryptPw(password);
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: pw,
    });
    sendToken(newUser, 201, req, res);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const compared = await bcrypt.compare(password, user.password);
    compared ? sendToken(user, 200, req, res) : res.status(400).json({ message: "Login Failed" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 10000),
    secure: NODE_ENV === "production" ? true : false,
    httpOnly: NODE_ENV === "production" ? true : false,
  };
  res.cookie("jwt", "expiredtoken", options);
  res.status(200).json({ status: "success" });
};

// Middleware

exports.secure = async (req, res, next) => {
  let token;
  if (req.cookies) token = req.cookies.jwt;
  if (!token || token === "expiredtoken") {
    return res.status(401).json({
      status: "unauthorized",
      message: "You are not authorized to view this content",
    });
  }
  const jwtInfo = await decryptJwt(token);
  const user = await User.findById(jwtInfo.id);
  if (!user) {
    return res.status(401).json({
      status: "unauthorized",
      message: "You are not authorized to view this content",
    });
  }
  req.user = user;
  next();
};
