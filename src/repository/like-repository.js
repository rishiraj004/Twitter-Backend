import Like from '../models/likes.js';
import CrudRepository from './crud-repository.js';

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async findByUserAndLikeable(data) {
        try {
            const like = await this.model.findOne(data);
            return like;
        } catch (error) {
            throw new Error(`Error finding like: ${error.message}`);
        }
    }
}

export default LikeRepository;
