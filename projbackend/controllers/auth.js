const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//exporting functions
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout",
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  //email, password field validation
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  //checking user details in database
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "email not found",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "invalid password",
      });
    }
    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //putting the token into the cookie
    res.cookie("COOKIE", token, { expire: new Date() + 9999 });
    //send responce to front end
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

//PROTECTED ROUTES
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//CUSTOM MIDDLEWARE
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not Admin, ACCESS DENIED",
    });
  }
  next();
};
