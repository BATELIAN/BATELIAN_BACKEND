import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname is required."],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  firstTimeLogin: {
    type: Boolean,
    default: true
  },
  status:{
    type:String
  },
  role: {
    type: String, 
  }, 
  calLink: {
    type:String,
  }, 
  calApiKey: {
    type:String,
  }, 
  verificationCode: {
    type: String,
  },
  verificationCodeExpires: {
    type: Number,
  },
  passwordResetCode: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false
},

});

export default model("Admin", AdminSchema);
