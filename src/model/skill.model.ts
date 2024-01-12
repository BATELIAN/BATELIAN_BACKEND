import { Schema, model } from "mongoose";

const skillSchema = new Schema({
  name: { type: String },
  files: { type: Array },
  description: {
    type:String
  }
});

export default model("Skill", skillSchema);
