//Importing Libraries
import { Schema, model } from "mongoose";

//using monoose to create the product schema
const serviceSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  files: {
    type: Array,
  },
});
export default model("Service", serviceSchema);
