import { UserService } from '../services/index.js';

const userService = new UserService();

class AuthController {
    async signUp(req, res) {
        try {
            const user = await userService.signUp({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            res.status(201).json({
                message: "User created successfully",
                data: user,
                success: true,
                err: {}
            });
        } catch (error) {
            console.error("Error signing up:", error);
            res.status(500).json({ 
                err: error.message,
                message: "Error signing up",
                success: false,
                data: {} 
            });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.signIn(email, password);
            if (user) {
                return res.status(200).json({
                    message: "User signed in successfully",
                    data: user,
                    success: true,
                    err: {}
                });
            } else {
                return res.status(401).json({
                    message: "Invalid credentials",
                    data: {},
                    success: false,
                    err: {}
                });
            }
        } catch (error) {
            console.error("Error signing in:", error);
            res.status(500).json({ 
                err: error.message,
                message: "Error signing in",
                success: false,
                data: {} 
            });
        }
    }
}

export default AuthController;