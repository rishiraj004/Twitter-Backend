import { TweetService } from "../services/index.js";
import upload from "../config/file-upload-s3-config.js";

const singleUpload = upload.single('image');
const tweetService = new TweetService();

class TweetController {
    async createTweet(req, res) {
        try {
            singleUpload(req, res, async (err, data) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    return res.status(500).json({ 
                        err: err,
                        message: "Error uploading file in controller",
                        success: false,
                        data: {} 
                    });
                }

                const tweetData = {...req.body };
                tweetData.image = req.file ? req.file.location : null; // S3 URL of the uploaded image

                const newTweet = await tweetService.createTweet(tweetData);
                res.status(201).json({
                    message: "Tweet created successfully",
                    data: newTweet,
                    success: true,
                    err: {}
                });
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