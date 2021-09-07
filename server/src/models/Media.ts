import mongoose from "../mongoose";
import { Schema } from "mongoose";

// Media types
export enum MediaType {
  None,
  Image,
  Video
}

// Document interface
export interface IMedia {
    alt: string,
    description: string,
    path: string,
    type: MediaType
}

// Create Mongoose schema
const schema: mongoose.Schema<IMedia> = new Schema<IMedia>({
  alt: {type: String, required: true},
  description: {type: String, required: true},
  path: {type: String, required: true},
  type: {type: Number, required: true}
});

const model: mongoose.Model<IMedia, any, any> = mongoose.model("Media", schema);

export default model;