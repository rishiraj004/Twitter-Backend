import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();

class TweetController {
    async createTweet(req, res) {
        try {
            const tweet = await tweetService.createTweet(req.body);
            res.status(201).json({
                message: "Tweet created successfully",
                data: tweet,
                success: true,
                err: {}
            });
        } catch (error) {
            console.error("Error creating tweet:", error);
            res.status(500).json({ 
                err: error,
                message: "Error creating tweet",
                success: false,
                data: {} 
            });
        }
    }

    async getTweetById(req, res) {
        try {
            const tweet = await tweetService.getTweetById(req.params.id);
            res.status(200).json({
                message: "Tweet fetched successfully",
                data: tweet,
                success: true,
                err: {}
            });
        } catch (error) {
            console.error("Error fetching tweet:", error);
            res.status(500).json({ 
                err: error,
                message: "Error fetching tweet",
                success: false,
                data: {} 
            });
        }
    }
}

export default TweetController;