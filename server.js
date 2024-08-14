/* IMPORTANT!!! When using ES6 extensions in Node.js,
   you should use the .js extension for your files when importing them.
 */

// Library imports
import 'express-async-errors';   // express-async-errors MUST BE AT TOP OF ALL OTHER IMPORTS!!!
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


// TEMP IMPORTS


// ROUTER IMPORTS
import jobRouter from "./routes/jobRouter.js";
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


// PUBLIC IMPORTS


// MIDDLEWARE IMPORTS
import handlesErrorMiddleware from './middleware/handlesErrorMiddleware.js';
import { authenticateUser } from "./middleware/handlesAuthMiddleware.js";


// -------------------------- MIDDLEWARE --------------------------- //


/**
 * Morgan Logging Middleware:
 *
 * @description Middleware for morgan logging wrapped in a condition to
 * only run in development environment. If this is === production, morgan
 * will not show the logs in the terminal
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing JSON data
app.use(express.json());



// -------------------------- ROUTES ------------------------------- //



// GET request controller request, response
app.get('/', (req, res) => {
    res.send('ExpressJS is synced!');
});


// POST Route to Home Page
// app.post('/', (req, res) => {
//     console.log(req);
//     res.json({ message: 'Data received', data: req.body });
// });


// Test Route for linking backend to frontend
app.get('/api/v0/test', (req, res) => {
    res.json({ msg: 'Proxy test route linking backend to frontend' });
});



// Mounting jobRouter on the '/api/v0/jobs' route
app.use('/api/v0/jobs', authenticateUser, jobRouter);
app.use('/api/v0/users', authenticateUser, userRouter);
app.use('/api/v0/auth', authRouter);



// -------------------------- ERROR HANDLING ----------------------- //


/**
 * Not Found Middleware:
 * This middleware is used when no routes match the incoming request
 * or rather when the request doesn't match anything in our server.
 * It sends a 404 status code and a JSON response with a message 'not found'.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'resource not found' });
});


/**
 * WARNING!! Mount the errorHandlerMiddleware function BEFORE the 500 error
 * middleware or the 'throw new NotFoundError' in jobController.js will not
 * work, as the error will not be caught by the customError.js or
 * errorHandlerMiddleware.js middleware functions.
 */
app.use(handlesErrorMiddleware);


/**
 * Internal Server Error Middleware:
 * Used to catch any errors that occur during the execution of route
 * handlers or other middleware. It's triggered by our existing controllers,
 * effectively showcasing an error upon a valid request when we try to
 * implement the functionality.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).json({ msg: 'something went wrong' });
// });




// -------------------------- SERVER CONNECTION --------------------- //


// Ears on local port 3000 with port 4000 as backup
const port = process.env.PORT || 4000;


/**
 * MongoDB Connection:
 * Connecting to the MongoDB database and starting the server.
 * Uses a try-catch block to handle any potential errors that might occur during
 * these operations.
 *
 * @async
 * @function
 * @description Tries to establish a connection with the MongoDB database using
 * the connection string from the environment variables. If the connection is
 * successful, it starts the server on the specified port. If an error occurs
 * during these operations, it logs the error and terminates the process with
 * a failure status code (1).
 */
try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URL);
    // If the connection is successful, start the server
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    // If error occurs, log error and terminate process with a failure status code
    console.log(error);
    process.exit(1);
}


/**
 * WARNING!! DIRECT Server conflict for the 'app.listen' function
 *
 * @throws {Error} This error can occur if the server is already running.
 * The following 'app.listen' function is in direct conflict with the 'try-catch'
 * block that starts the server (above code block) The 'try-catch' block starts
 * the server if the connection to the MongoDB database is successful. If the
 * server is already running, the 'app.listen' function will throw an error since
 * the server is already running on the specified port.
 *
 * @param {number} port - The port number on which the server should
 * listen.
 */
// app.listen(port, () => {
//     console.log(`server running on PORT ${port}....`);
// });
