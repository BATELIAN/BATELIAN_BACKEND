import { Schema, model } from "mongoose";

const SubscribeSchema = new Schema({
  firstaName: { type: String },
  lastName: { type:String},
  email: { type: String },
 
});

export default model("Subscribe", SubscribeSchema);
