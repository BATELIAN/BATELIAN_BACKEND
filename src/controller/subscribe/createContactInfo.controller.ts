//Importing the hero model to the controller
import ContactInfoModel from "../../model/contactInfo.model";
import { Request, Response } from "express";

export const createInfo = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { name, value, type } = req.body;

  try {
    const Contact = await new ContactInfoModel({
      name: name,
      value: value,
      type: type,
    });

    Contact.save();
    return res.status(201).json({
      success: true,
      message: "contact info createdsuccessfully",
    });
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error,
    });
  }
};
