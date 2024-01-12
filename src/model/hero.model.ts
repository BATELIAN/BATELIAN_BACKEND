import { Schema, model } from "mongoose";

const heroSchema = new Schema({
  title: { type: String },
  description: { type: String },
  files: { type: Array },
});

export default model("Hero", heroSchema);
