import { Request, Response } from "express";
import CustomerModel from "../../model/customer.model";
import { IncomingMessage, UserDataType} from "../../middleware/authJWT";

export const getRequest = async (req: Request, res: Response) => {
  const bookings = await CustomerModel.find()
  res.status(200).send(bookings);
};

export const singleRequest = async (req: IncomingMessage, res: Response) => {
  const { userId } = req.userData as UserDataType;
  const booking = await CustomerModel.findOne({clientId: userId })
  res.status(200).send(booking);
};


export const Myclients = async (req: IncomingMessage, res: Response) => {
  const { userId } = req.userData as UserDataType;
  const booking = await CustomerModel.find({assignedId: userId })
  res.status(200).send(booking);
};