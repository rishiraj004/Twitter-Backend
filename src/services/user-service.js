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
}

export default UserService;