import { Schema, model } from "mongoose";

const ContactInfoSchema = new Schema({
    name: { type: String },
    value: { type: String },
    type: { type: String },
 
});

export default model("ContactInfo", ContactInfoSchema);


