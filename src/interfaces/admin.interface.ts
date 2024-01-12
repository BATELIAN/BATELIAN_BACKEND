import { ObjectId } from "mongoose";

export interface Admin {
    fullName: string,
    email: string,
    password: string;
    phoneNumber: string, 
    role: string, 
    calLink: string,
    status: string,
    calApiKey:string
  }
  
export interface AdminModelID extends Admin {
    _id:ObjectId, 
    firstTimeLogin:boolean
  }
  