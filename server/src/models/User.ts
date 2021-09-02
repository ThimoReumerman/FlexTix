import mongoose from "mongoose";
import { Schema } from "mongoose";

// Document interface
export interface IUser {
    firebaseId: string,
    admin: boolean,
    tickets: [{
        concertId: string,
        state: string
    }]
}

// Create Mongoose schema
const schema = new Schema<IUser>({
    firebaseId: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false},
    tickets: [{
        concertId: {type: String, required: true},
        state: {type: String, required: true, default: "cart"}
    }]
});

export default mongoose.model("User", schema);