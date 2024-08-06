/* IMPORTANT!!! When using ES6 extensions in Node.js,
   you should use the .js extension for your files when importing them.
 */

// Library imports
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';


// ROUTER IMPORTS



// PUBLIC IMPORTS



// MIDDLEWARE IMPORTS



// -------------------------- MIDDLEWARE --------------------------- //

/**
 * @description Middleware for morgan logging wrapped in a condition to
 * only run in development environment. If this is === production, morgan
 * will not show the logs in the terminal
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Sup, world?');
});

app.post('/', (req, res) => {
    console.log(req);
    res.json({ message: 'Data received', data: req.body });
});



// -------------------------- SERVER CONNECTION --------------------- //

// Ears on local port 3000 with port 4000 as backup
// Access env variables in app
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
});

// app.listen(3000, () => {
//     console.log('server running....');
// });