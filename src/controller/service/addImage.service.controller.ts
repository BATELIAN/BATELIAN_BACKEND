//Importing the product model to the controller
import ServiceModel from "../../model/service.model";

// Importing the the cloudinary config
import { Request, Response } from "express";
//Imporing file system library
import {  loop } from "../../utils/db_functions/help";

export const addImage = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { id } = req.params;
  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        const urls = await loop(files);
        //we use uuidv4 to generate a random and unique id for the services
        const verifyservice = await ServiceModel.findOne({ _id: id });
        if (!verifyservice) {
          return res.status(404).json({
            message: "service not found",
            status: false,
          });
        }
        const filesarray = verifyservice.files;
        filesarray.push(urls);
        verifyservice.save();
        return res.status(201).json({
          success: true,
          message: "image added sucessfully",
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
