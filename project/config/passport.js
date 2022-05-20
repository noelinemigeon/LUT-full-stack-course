const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Item = require('../models/item');
const config = require('../config/database');
const { addItem } = require('../models/item');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload.date._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
        username=jwt_payload.date.username;
    }));
}
