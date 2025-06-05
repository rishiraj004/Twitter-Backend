import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/serverConfig.js';
import connect from './config/database.js';
import TweetService from './services/tweet-service.js';

const app = express();
const tweetService = new TweetService();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    await connect()
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
    
    tweetService.createTweet({
        content: "This is a sample tweet with a #hashtag and another #example"
    }).then(tweet => {
        console.log("Tweet created successfully:", tweet);
    }).catch(err => {
        console.error("Error creating tweet:", err);
    })
});
