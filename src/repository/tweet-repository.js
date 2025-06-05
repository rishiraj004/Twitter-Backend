import Tweet from '../models/tweets.js';
import { populateCommentsRecursively } from '../utils/comment-populate-helper.js';

class TweetRepository {
    async createTweet(tweetData) {
        try {
            const tweet = await Tweet.create(tweetData);
            return tweet;
        } catch (error) {
            throw new Error('Error creating tweet: ' + error.message);
        }
    }

    async getTweetById(tweetId) {
        try {
            const tweet = await Tweet.findById(tweetId).populate('comments');
            if (!tweet) {
                throw new Error('Tweet not found');
            }
            return tweet;
        } catch (error) {
            throw new Error('Error fetching tweet: ' + error.message);
        }
    }

    async getAllTweets() {
        try {
            const tweets = await Tweet.find().populate('comments');
            return tweets;
        } catch (error) {
            throw new Error('Error fetching tweets: ' + error.message);
        }
    }

    async updateTweet(tweetId, tweetData) {
        try {
            const tweet = await Tweet.findByIdAndUpdate(tweetId, tweetData, { new: true });
            if (!tweet) {
                throw new Error('Tweet not found');
            }
            return tweet;
        } catch (error) {
            throw new Error('Error updating tweet: ' + error.message);
        }
    }

    async deleteTweet(tweetId) {
        try {
            const tweet = await Tweet.findByIdAndDelete(tweetId);
            if (!tweet) {
                throw new Error('Tweet not found');
            }
            return tweet;
        } catch (error) {
            throw new Error('Error deleting tweet: ' + error.message);
        }
    }

    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate('likes');
            return tweet;
        } catch (error) {
            throw new Error('Error finding tweet: ' + error.message);
        }
    }

    async getWithComments(tweetId) {
        try {
            const tweet = await Tweet.findById(tweetId)
                .populate('comments')
                .lean();
            if (!tweet) {
                throw new Error('Tweet not found');
            }
            // Recursively populate all nested comments and their users
            if (tweet.comments && tweet.comments.length > 0) {
                tweet.comments = await populateCommentsRecursively(tweet.comments);
            }
            return tweet;
        } catch (error) {
            throw new Error('Error fetching tweet with comments: ' + error.message);
        }
    }
}

export default TweetRepository;
