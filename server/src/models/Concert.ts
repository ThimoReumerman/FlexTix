import mongoose from "mongoose";
import { Schema } from "mongoose";

// Document interface
export interface IConcert {
    title: string,
    description: string,
    genre: string,
    price: number,
    location: string,
    artists: [{
        artistId: string
    }],
    media: [{
        alt: string,
        description: string,
        path: string
    }]
}

// Create Mongoose schema
const schema = new Schema<IConcert>({
    title: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    artists: [{
        artistId: {type: String, required: true}
    }],
    media: [{
        alt: {type: String, required: true},
        description: {type: String, required: false},
        path: {type: String, required: true},
        type: {type: String, required: true}
    }]
});

export default mongoose.model("Concert", schema);