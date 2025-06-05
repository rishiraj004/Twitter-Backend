import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 160
    },
}, {timestamps: true});

userSchema.pre("save", function(next) {
    const user = this;
    const SALT_ROUNDS = 10;
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate() {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}

const User = mongoose.model("User", userSchema);

export default User;
