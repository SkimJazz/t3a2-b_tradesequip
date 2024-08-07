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
import jobRouter from "./routes/jobRouter.js";

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

// Middleware for parsing JSON data
app.use(express.json());



// -------------------------- ROUTES ------------------------------- //



// GET request controller request, response
app.get('/', (req, res) => {
    res.send('Sup, world? ExpressJS is synced!');
});

app.post('/', (req, res) => {
    console.log(req);
    res.json({ message: 'Data received', data: req.body });
});

// Mounting jobRouter on the '/api/v0/jobs' route
app.use('/api/v0/jobs', jobRouter);



// -------------------------- ERROR HANDLING ----------------------- //



// Notfound middleware for routes that do not exist -> Must be after all routes
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});



// -------------------------- SERVER CONNECTION --------------------- //



// Error middleware for server errors -> Will be moved to a separate file later
app.use((err, req, res, next) => {
    console.log(err);
    // This error middleware will get triggered if there is an error in any of the routes
    res.status(500).json({ msg: 'something went wrong' });
});

// Ears on local port 3000 with port 4000 as backup
// Access env variables in app
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
});

// app.listen(3000, () => {
//     console.log('server running....');
// });