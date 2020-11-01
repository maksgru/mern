const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require("../config/default");
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key.jwtSecret
};

module.exports = function(passport){
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            const user = await User.findById(payload.userId).select('email id')
            try {
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch(e) {
                console.log(e);
            }
        })
    )
}