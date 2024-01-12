import { ObjectId } from "mongoose";

export interface Customer {
  workEmail: string,
  companyName:string,
  companySize: string,
  employeeName:string,
  phoneNumber: string,
  Request: Request[]
  
}
export interface Request {
  skills: string[]
  jobType: string
  location: string  
}


