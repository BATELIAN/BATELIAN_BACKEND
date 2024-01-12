import { Schema, model } from "mongoose";
const RequestSchema = new Schema({

  
})
const CustomerSchema = new Schema({
  workEmail: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companySize: {
    type: String
  },
  employeeName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  assignedId:{
    type:String
  },
  assignedBy:{
    type:String
  }, 
  calLink:{
    type:String
  },
  calApiKey: {
    type:String
  },
  skill: {
    type: String,
  },
  jobType: {
    type:String, //FullTime, ParTime
  },
  location: {
    type: String //Remote
  }, 
  status:{
    type:String, 
    default: "REQUESTING"
  },
  request: [RequestSchema], 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default model("Customer", CustomerSchema);
