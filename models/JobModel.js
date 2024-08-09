import mongoose from 'mongoose';


// Prelim schema for the Job model -> More stuff to add later.
const JobSchema = new mongoose.Schema(
    {
        clientName: String,
        jobTitle: String,
        jobStatus: {
            type: String,
            enum: ['pending', 'in progress', 'completed', 'cancelled'],
            default: 'pending',
        },
        jobType: {
            type: String,
            enum: ['form-work', 'concreting', 'soil-testing'],
            default: 'form-work',
        },
        jobLocation: {
            type: String,
            default: 'my city',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Job', JobSchema);