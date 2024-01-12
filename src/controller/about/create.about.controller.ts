//Importing the about model to the controller
import AboutModel from "../../model/about.model";
import { Request, Response } from "express";
import {  loop } from "../../utils/db_functions/help";

export const create = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { title, description } = req.body;

  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        console.log("files", files)
        const urls = await loop(files);
        const about = await new AboutModel({
          title: title,
          description: description,
          files: urls,
        }); 

        about.save();
        return res.status(201).json({
          success: true,
          message: "about created sucessfully",
          data: about,
        });
      } else {
        const about = await new AboutModel({
          title: title,
          description: description,
        });

        about.save();
        return res.status(201).json({
          success: true,
          message: "about created sucessfully",
          data: about,
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
