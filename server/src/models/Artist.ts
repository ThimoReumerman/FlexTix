import mongoose from "../mongoose";
import { Schema } from "mongoose";

// Document interface
export interface IArtist {
    name: string,
    bio: string,
    media: [{
        mediaId: string
    }]
}

// Create Mongoose schema
const schema: mongoose.Schema<IArtist> = new Schema<IArtist>({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    media: [{
        mediaId: {type: String, required: true}
    }]
});

const model: mongoose.Model<IArtist, any, any> = mongoose.model("Artist", schema);

export default model;