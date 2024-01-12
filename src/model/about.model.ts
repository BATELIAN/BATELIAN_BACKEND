import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
  title: { type: String },
  description: { type: String },
  files: { type: Array },
});

export default model("About", AboutSchema);

