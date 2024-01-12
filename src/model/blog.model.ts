import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    body: {
        type: String
    },
    links: {
        type: String
    },
    files: {
        type: Array
    }, 
    author: {
        type: String
    }, 
    createdAt: {
        type: Date
    }
});

export default model("Blog", blogSchema);
