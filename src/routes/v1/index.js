import express from 'express';
import TweetController from '../../controllers/tweet-controller.js';
import LikeController from '../../controllers/like-controller.js';
import CommentController from '../../controllers/comment-controller.js';

const router = express.Router();

const tweetController = new TweetController();
const likeController = new LikeController();
const commentController = new CommentController();

router.post('/tweets', tweetController.createTweet);
router.post('/likes/toggle', likeController.toggleLike);
router.post('/comments', commentController.createComment);
router.get('/tweets/:id', tweetController.getTweetById);

export default router;