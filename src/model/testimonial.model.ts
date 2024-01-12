import { Schema, model } from "mongoose";

const TestimonialSchema = new Schema({
  name: { type: String },
  message: { type: String },
  status: { type: String }
});

export default model("testimonial", TestimonialSchema);
