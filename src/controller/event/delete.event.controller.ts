//Importing the product model to the controller
import { Request, Response } from "express";
import eventModel from "../../model/event.model";

export const deleteevent = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  try {
    //Fetching single event using the id in the req.params from the database and assigning it to event
    await eventModel.deleteOne({ _id: id });

    //Since there is no data to be responde we simple send a message
    return res.status(200).json({
      success: true,
      message: "event deleted sucessfully",
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
}
