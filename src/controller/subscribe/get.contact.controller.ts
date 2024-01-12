import { Request, Response } from "express";
import { getAll, showSingle } from "../../utils/db_functions/contact.db";
import subscribeModel from "../../model/subscribe.model";

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await subscribeModel.find();
  res.status(200).send(contacts);
};

export const getContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await subscribeModel.findOne({_id: id});
  res.status(200).send(contact);
};
