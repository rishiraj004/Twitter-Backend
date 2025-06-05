import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/serverConfig.js';
import connect from './config/database.js';

const app = express();

app.listen(PORT, async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await connect()
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
    console.log(`Server is running on port ${PORT}`);
});
