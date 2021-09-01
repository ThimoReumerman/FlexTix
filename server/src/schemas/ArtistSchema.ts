import { Schema } from "mongoose";

// Document interface
interface Artist {
    name: string,
    bio: string,
    media: [{
        alt: string,
        description: string,
        path: string
    }]
}

// Create Mongoose schema
const schema = new Schema<Artist>({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    media: [{
        alt: {type: String, required: true},
        description: {type: String, required: false},
        path: {type: String, required: true}
    }]
});

export default schema;