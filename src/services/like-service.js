import { LikeRepository, TweetRepository } from "../repository/index.js";

import Tweet from "../models/tweets.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            const likeData = {
                likeable: modelId,
                onModel: modelType,
                user: userId
            };

            const existingLike = await this.likeRepository.findByUserAndLikeable(likeData);

            if (existingLike) {
                // If the like exists, remove it
                await this.likeRepository.destroy(existingLike._id);
                var isAdded = false;
            } else {
                // If the like does not exist, create it
                await this.likeRepository.create(likeData);
                var isAdded = true;
            }
            return {
                message: isAdded ? "Like added successfully" : "Like removed successfully",
                isAdded: isAdded
            };
        } catch (error) {
            throw new Error(`Error toggling like: ${error.message}`);
        }
    }
}

export default LikeService;