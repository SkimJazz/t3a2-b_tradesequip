import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
    {
        clientCompName: String,
        clientAddress: String,
        projectContact: String,

        // Client createdBy tied to User -> Value is Mongo ObjectId -> Referencing the User
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Client', ClientSchema);