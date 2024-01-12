import { Schema, model } from "mongoose";

const FaqSchema = new Schema({
  question: { type: String },
  answer: { type: String },
});

export default model("FAQ", FaqSchema);
