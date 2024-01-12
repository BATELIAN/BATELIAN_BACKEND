//Importing the product model to the controller
import ServiceModel from "../../model/service.model";
import { Request, Response } from "express";

export const update = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body 
  const { title, description, body } = req.body
  //Destructing the id from req.params
  const { id } = req.params
  const updateData = {
    title,
    description,
    body,
  }
  const services = await ServiceModel.findOne({ _id: id });

  if (req.method !== "PUT") {
    return res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }

  try {
    if (!services) {
      return res.status(400).json({
        success: false,
        message: "services not found",
      });
    }
    services.updateOne(updateData, { useFindAndModify: false }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update services with id=${id}. Maybe services was not found!`,
        });
      } else
        return res
          .status(201)
          .json({ message: "services updated successfully." });
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
