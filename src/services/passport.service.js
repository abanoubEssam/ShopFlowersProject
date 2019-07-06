import bcrypt from 'bcrypt';
import config from 'config';
import { Mongoose } from 'mongoose';

const {UserModel} = require('../models/user.models');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async function (username, password, done) {
        let user = await UserModel.findOne({
            email: username
        });
        // console.log(' user --==**** ' , user)
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        // console.log('password --**' , password , ' user.password --**** ' , user.password)
        // console.log('validPassword*****' , validPassword)
        if (!validPassword) return done(new Error('invalid email or password!!!!'));
        return done(null, user);

    }
));


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwtPrivateKey');
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
     let user = await UserModel.findById(jwt_payload.id);
    //  console.log('############', jwt_payload.id, user);
    if (user) {
        return done(null, user);
    } else {
        return done(new Error('invalid token'));
        // or you could create a new account
    }
}));

// jwt passport strategy ends here
let AuthLocal = passport.authenticate('local', {
    session: false
});

let JWTAuth = passport.authenticate('jwt', {
    session: false
});
export {AuthLocal , JWTAuth}