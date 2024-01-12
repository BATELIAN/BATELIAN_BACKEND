import { ObjectId } from "mongoose";

export interface Admin {
    fullName: string,
    email: string,
    password: string;
    phoneNumber: string
  }
  
export interface ClientModelID extends Admin {
    _id:ObjectId,
    firstTimeLogin:boolean

  }
  