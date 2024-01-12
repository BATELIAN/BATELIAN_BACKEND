import { Schema, model } from "mongoose";

const stepSchema = new Schema({
  title: { type: String },
  description: { type: String },
  files: { type: Array}
});

export default model("Step", stepSchema);
