import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'super'],
        default: 'user',
    },
    // Add avatar property to UserSchema
    avatar: String,
    avatarPublicId: String,
});

//Instance method to remove password from user object:
// Ruh?? Stop the hashed password from being sent to the client in JSON response
UserSchema.methods.toJSON = function () {
    // convert User to JavaScript object
    let obj = this.toObject();
    // Remove password property from object
    delete obj.password;
    // Get back User object without password property
    return obj;
};

export default mongoose.model('User', UserSchema);