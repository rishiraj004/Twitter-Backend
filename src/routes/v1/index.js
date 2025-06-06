import express from 'express';
import { TweetController, LikeController, CommentController, AuthController } from '../../controllers/index.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

const tweetController = new TweetController();
const likeController = new LikeController();
const commentController = new CommentController();
const authController = new AuthController();

router.post('/tweets', authenticate , tweetController.createTweet);
router.post('/likes/toggle', authenticate , likeController.toggleLike);
router.post('/comments', authenticate , commentController.createComment);
router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.get('/tweets/:id', tweetController.getTweetById);

export default router;