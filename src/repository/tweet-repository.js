import Tweet from '../models/tweet.js';

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
}

export default new TweetRepository();
