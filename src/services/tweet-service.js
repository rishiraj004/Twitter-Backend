import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async createTweet(tweetData) {
        const content = tweetData.content;
        let hashtags = content.match(/#[a-zA-Z0-9_]+/g) || []; // Match hashtags in the content
        hashtags = hashtags.map(tag => tag.substring(1)); // Remove the '#' character
        hashtags = hashtags.map(tag => tag.toLowerCase()); // Convert hashtags to lowercase
        
        const tweet = await this.tweetRepository.createTweet(tweetData);
        
        let alreadyCreatedHashtags = await this.hashtagRepository.getHashtagsByName(hashtags); // Fetch existing hashtags by name
        let titleOfHashtags = alreadyCreatedHashtags.map(hashtag => hashtag.title); // Extract titles of already created hashtags
        let newHashtags = hashtags.filter(tag => !titleOfHashtags.includes(tag)); // Filter out hashtags that are already created
        newHashtags = newHashtags.map(tag => ({ // Create new hashtag objects
            title: tag,
            tweets: [tweet._id]
        }));
        await this.hashtagRepository.bulkCreateHashtags(newHashtags);
    
        // Update existing hashtags to include the new tweet
        alreadyCreatedHashtags.forEach(async (hashtag) => {
            hashtag.tweets.push(tweet._id);
            await hashtag.save();
        });

        // Fetch the newly created hashtags to get their _id values
        let createdHashtags = [];
        if (newHashtags.length > 0) {
            const newTitles = newHashtags.map(tag => tag.title);
            createdHashtags = await this.hashtagRepository.getHashtagsByName(newTitles);
        }

        // Combine all hashtag IDs (existing and new)
        tweet.hashtags = [
            ...alreadyCreatedHashtags.map(hashtag => hashtag._id),
            ...createdHashtags.map(hashtag => hashtag._id)
        ];
        await tweet.save(); // Save the tweet with the associated hashtags
        return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        return tweet;
    }
}

export default TweetService;
