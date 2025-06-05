import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/serverConfig.js';
import connect from './config/database.js';
import apiRoutes from './routes/index.js';
import passport from 'passport';
import { passportAuth } from './config/jwt-middleware.js';

const app = express();

const setUpAndStartServer = async() =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.use(passport.initialize());
    passportAuth(passport);
    
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
        await connect()
            .then(() => console.log('Database connected successfully'))
            .catch(err => console.error('Database connection error:', err));
    
    });
}

setUpAndStartServer().catch(err => {
    console.error('Error starting server:', err);
});
