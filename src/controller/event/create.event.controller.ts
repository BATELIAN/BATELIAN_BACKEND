//Importing the product model to the controller
import eventModel from "../../model/event.model";
import { Request, Response } from "express";
import { Mloop } from "../../utils/db_functions/help";

export const create = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { title, description, links, body } = req.body;

  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        const urls = await Mloop(files);

        //creating the event
      
        const event
       = await new eventModel({
          title: title,
          description: description,
          body: body,
          links: links,
          files: urls,
        });

        event
      .save();
        return res.status(201).json({
          success: true,
          message: "event created sucessfully",
          event
        ,
        });
      } else {
        const event
       = await new eventModel({
          title: title,
          description: description,
          body: body,
          links: links,
        });

        event
      .save();
        return res.status(201).json({
          success: true,
          message: "event created sucessfully",
          event
        ,
        });
      }
    } else {
      return res.status(405).json({
        err: `${req.method} method not allowed`,
      });
    }
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error,
    });
  }
};
