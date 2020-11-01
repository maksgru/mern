const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require("passport");

const router = express.Router();

const registerValid = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password length must be more then 6").isLength({ min: 6 }),
];
const loginValid = [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Enter Password').exists()
];


router.post("/register", registerValid, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect registration data",
      });
    }
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "This email already used" });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (e) {
    res.status(500).json({ message: "server error, please try again" });
  }
});

router.post("/login", loginValid, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Incorrect login data",
          });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect password, please try again'})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})
        
      } catch (e) {
        res.status(500).json({ message: "server error, please try again" });
      }
});

router.get('/getUser', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user)
  return res.status(200).json(req.user)
})

module.exports = router;
