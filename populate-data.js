/**
 * @file populate-data.js
 * @description Populates the database with demo job data for the Demo user.
 *
 * To populate the database with demo data, first comment out the following code:
 *
 *          const user = await User.findOne({ email: 'josh@email.com' });
 *
 * Then uncomment the following code:
 *
 *         const user = await User.findOne({ email: 'test@test.com' });
 *
 * Instead of running 'npm run dev', the run the terminal command: 'node populate-data'.
 * This will populate the database with seedDataJobs.json, and seedDataClients.json. for
 * the Demo user and Super user.
 */

// External imports
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Local imports
import Job from './models/JobModel.js';
import User from './models/UserModel.js';
import Client from './models/ClientModel.js';

try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({ email: 'josh@email.com' }); // SuperUser Change email to your own
    // const user = await User.findOne({ email: 'test@test.com' });


    // -------------------- populate Jobs database -------------------- //

    // Read the mockData array from the seedDataJobs.json file
    const jsonJobs = JSON.parse(
        await readFile(new URL('./utils/seedDataJobs.json', import.meta.url))
    );
    // New array of jobs using createdBy field set to test@test user's id (use ...spread operator)
    const jobs = jsonJobs.map((job) => {
        return { ...job, createdBy: user._id };
    });
    // Delete all jobs created by test@test user if they exist
    await Job.deleteMany({ createdBy: user._id });
    // Pass in new jobs array to create method
    await Job.create(jobs);


    // -------------------- populate Clients database -------------------- //

    const jsonClients = JSON.parse(
        await readFile(new URL('./utils/seedDataClients.json', import.meta.url))
    );
    const clients = jsonClients.map((client) => {
        return { ...client, createdBy: user._id };
    });
    await Client.deleteMany({ createdBy: user._id });
    await Client.create(clients);


    // -------------------- OK or Not OK MESSAGE ----------------------- //

    // console.log('Demo data populated!');
    console.log('Super data populated!');
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}