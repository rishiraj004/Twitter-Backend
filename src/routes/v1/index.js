import express from 'express';
import { TweetController, LikeController, CommentController, AuthController } from '../../controllers/index.js';
const router = express.Router();

const tweetController = new TweetController();
const likeController = new LikeController();
const commentController = new CommentController();
const authController = new AuthController();

router.post('/tweets', tweetController.createTweet);
router.post('/likes/toggle', likeController.toggleLike);
router.post('/comments', commentController.createComment);
router.post('/signup', authController.signUp);
router.get('/tweets/:id', tweetController.getTweetById);

export default router;