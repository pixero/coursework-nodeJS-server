import mongoose, { Schema } from 'mongoose';

const User = new Schema(
    {
        username:String,
        password:String
    }
);
export const User = mongoose.model('User', User);


