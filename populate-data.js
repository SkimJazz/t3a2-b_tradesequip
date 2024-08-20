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
 * the run the terminal command: 'node populate-data'. This will populate
 * the database with mockData.json data for the Demo user, and the SuperUser
 */

// External imports
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Local imports
import Job from './models/JobModel.js';
import User from './models/UserModel.js';

try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({ email: 'josh@email.com' }); // SuperUser Change email to your own
    // const user = await User.findOne({ email: 'test@test.com' });

    // Read the mockData array from the mockData.json file
    const jsonJobs = JSON.parse(
        await readFile(new URL('./utils/mockData.json', import.meta.url))
    );
    // New array of jobs using createdBy field set to test@test user's id
    const jobs = jsonJobs.map((job) => {
        return { ...job, createdBy: user._id };
    });
    // Delete all jobs created by test@test user if they exist
    await Job.deleteMany({ createdBy: user._id });
    // Pass in new jobs array to create method
    await Job.create(jobs);
    // console.log('Demo data populated!');
    console.log('Super data populated!');
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}