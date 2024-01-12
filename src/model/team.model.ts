import { Schema, model } from "mongoose";

const Teamchema = new Schema({
  title: { type: String },
  name: { type: String },
  files: { type: Array },
});

export default model("Team", Teamchema);
