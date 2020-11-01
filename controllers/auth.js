const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/app.js");

const User = require("../models/User");

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
      res.status(409).json({message: 'This email already used'})
  } else {
    const salt = bCrypt.genSaltSync(10);
    const password = req.body.password;  
    const user = new User({
          email: req.body.email,
          password: bCrypt.hashSync(password, salt)
      })
      try {
          await user.save()
          res.status(201).json(user)
      } catch(e) {

      }
  }
};

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        const passwordResult = bCrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, key.jwtSecret, {expiresIn: 60 * 60})
            res.status(200).json({token: `Bearer ${token}`});
        } else {
            res.status(401).json({message: 'incorrect password'})
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}
