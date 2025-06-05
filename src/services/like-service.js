import { LikeRepository, TweetRepository } from "../repository/index.js";

import Tweet from "../models/tweets.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            if(modelType == 'Tweet') {
                var likeable = await this.tweetRepository.find(modelId);
            } else if(modelType == 'Comment') {
                var likeable = await this.commentRepository.find(modelId);
            } else {
                throw new Error('Invalid model type');
            }

            const likeData = {
                likeable: modelId,
                onModel: modelType,
                user: userId
            };

            const existingLike = await this.likeRepository.findByUserAndLikeable(likeData);

            if (existingLike) {
                // If the like exists, remove it
                await existingLike.remove();
                likeable.likes.pull(existingLike._id);
                await likeable.save();
                var isAdded = false;
            } else {
                // If the like does not exist, create it
                await this.likeRepository.create(likeData);
                likeable.likes.push(likeData);
                await likeable.save();
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