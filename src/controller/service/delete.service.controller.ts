//Importing the service model to the controller
import ServiceModel from "../../model/service.model";
import { Request, Response } from "express";

//Delete a single service
export const deleteservice = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  try {
    //Fetching single service using the id in the req.params from the database and assigning it to service
    await ServiceModel.deleteOne({ _id: id });

    //Since there is no data to be responde we simple send a message
    return res.status(200).json({
      success: true,
      message: "service deleted sucessfully",
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
