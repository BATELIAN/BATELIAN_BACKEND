//Importing the hero model to the controller
import ContactModel from "../../model/contact.model";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { fullName, subject, message, email, phoneNumber } = req.body;

  try {
        const Contact = await new ContactModel({
          fullName: fullName,
          subject: subject,
          message: message, 
          email: email,
          phoneNumber: phoneNumber
        });

        Contact.save();
        return res.status(201).json({
          success: true,
          message: "message sent successfully",
        });
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error,
    });
  }
};
