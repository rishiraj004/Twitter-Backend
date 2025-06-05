import { UserRepository } from "../repository/index.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(userData) {
        try {
            const user = await this.userRepository.create(userData);
            return user;
        } catch (error) {
            throw new Error(`Error signing up user: ${error.message}`);
        }
    }

    async signIn(email, password) {
        try {
            const user = await this.userRepository.findBy({ email });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const isMatch = user.comparePassword(password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            const token = user.genJWT();
            return token;
        } catch (error) {
            throw new Error(`Error signing in user: ${error.message}`);
        }
    }
}

export default UserService;