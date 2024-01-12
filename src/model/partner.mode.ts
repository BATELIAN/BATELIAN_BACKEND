import { Schema, model } from "mongoose";

const PartnerSchema = new Schema({
  name: { type: String },
  files: { type: Array },
});

export default model("Partner", PartnerSchema);
