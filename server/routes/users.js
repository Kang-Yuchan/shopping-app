const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      userId: userInfo._id
    });
  });
});

router.post("/login", (req, res) => {
  // find requested email in DB
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (!user) {
        // if not exist user
        return res.json({
          loginSuccess: false,
          existUser: "notUser",
          message: "This user is not exist."
        });
      }
      // confirm password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            isMatch: "notMatch",
            message: "This password is not currect."
          });
        }
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          res.cookie(process.env.COOKIE_NAME, user.token).status(200).json({
            loginSuccess: true,
            userId: user._id
          });
        });
      });
    }
  );
});

router.post("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    {
      token: ""
    },
    (err, user) => {
      if (err) {
        return res.json({
          success: false,
          err
        });
      }
      return res.status(200).send({
        success: true
      });
    }
  );
});

module.exports = router;
