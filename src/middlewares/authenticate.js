import passport from "passport";

export const authenticate = (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
        if (err) {
            next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access no user found",
                success: false,
                err: info ? info.message : "No user found",
                data: {}
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}