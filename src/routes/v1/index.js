import express from 'express';
import TweetController from '../../controllers/tweet-controller.js';

const router = express.Router();
const tweetController = new TweetController();

router.post('/tweets', tweetController.createTweet.bind(tweetController));

export default router;