import express from 'express';
import TweetController from '../../controllers/tweet-controller.js';
import LikeController from '../../controllers/like-controller.js';

const router = express.Router();
const tweetController = new TweetController();
const likeController = new LikeController();

router.post('/tweets', tweetController.createTweet);
router.post('/likes/toggle', likeController.toggleLike);

export default router;