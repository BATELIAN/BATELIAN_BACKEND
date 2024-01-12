import { getAll, showSingle } from "../../utils/db_functions/event.db";
import { Request, Response } from "express";

//Get all events async function
export const getevents = async (req:Request, res:Response) => {
  //Fetching all events from the database and assigning it to events
  const events = await getAll();
  //Responding the data to any request made
  return res.status(200).json(events.reverse())
  //I use .reverse() function to get the latest datas at first
};

//Get Single event
export const showevents = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  //Fetching single event using the id in the req.params from the database and assigning it to event
  const event = await showSingle(id);

  try {
    if (event) {
      //Responding the data to any request made
      return res.status(200).json(event)
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
