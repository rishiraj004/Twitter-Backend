import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/serverConfig.js';
import connect from './config/database.js';
import TweetRepository from './repository/tweet-repository.js';


const app = express();
const tweetRepository = new TweetRepository();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    await connect()
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
    
});
