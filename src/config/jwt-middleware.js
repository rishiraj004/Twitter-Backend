import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export const passportAuth = (passport) => {
    try{
        passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        }));
    } catch (error) {
        console.error("Error setting up JWT strategy:", error);
    }
}

