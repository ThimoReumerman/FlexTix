import { Schema } from "mongoose";

// Document interface
interface User {
    firebaseId: string,
    admin: boolean,
    tickets: [{
        concertId: string,
        state: string
    }]
}

// Create Mongoose schema
const schema = new Schema<User>({
    firebaseId: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false},
    tickets: [{
        concertId: {type: String, required: true},
        state: {type: String, required: true, default: "cart"}
    }]
});

export default schema;