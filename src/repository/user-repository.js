import User from "../models/users.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data) {
        try {
            const user = await User.findOne(data);
            return user;
        } catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
}

export default UserRepository;