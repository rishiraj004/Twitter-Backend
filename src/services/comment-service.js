import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async createComment(modelId, modelType, userId, content) {
        try{
            if(modelType === 'tweet') {
                const commentable = await this.tweetRepository.get(modelId);
            }else if(modelType === 'comment') {
                const commentable = await this.commentRepository.get(modelId);
            }else {
                throw new Error('Invalid model type');
            }

            const commentData = {
                content: content,
                user: userId,
                commentable: modelId,
                onModel: modelType,
                comments: []
            };

            const comment = await this.commentRepository.create(commentData);
            commentable.comments.push(comment);
            await commentable.save();
            return comment;
        }
        catch (error) {
            throw new Error('Error creating comment: ' + error.message);
        }
    }

    async getCommentsForTweet(tweetId) {
        try {
            const tweet = await this.tweetRepository.getWithComments(tweetId);
            return tweet.comments;
        } catch (error) {
            throw new Error('Error fetching comments for tweet: ' + error.message);
        }
    }
}

export default CommentService;
