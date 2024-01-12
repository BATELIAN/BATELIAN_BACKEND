//Importing the product model to the controller
import ServiceModel from "../../model/service.model";

import { Request, Response } from "express";
import { Mloop } from "../../utils/db_functions/help";

export const create = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { title, description, body } = req.body;

  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        const urls = await Mloop(files);
        //creating the service
        const service = await new ServiceModel({
          title: title,
          description: description,
          body: body,
          files: urls,
        });
        service.save();
        return res.status(201).json({
          success: true,
          message: "service created sucessfully",
          data: service,
        });
      } else {
        //creating the service
        const service = await new ServiceModel({
          title: title,
          description: description,
          body: body,
        });

        service.save();
        return res.status(201).json({
          success: true,
          message: "service created sucessfully",
          data: service,
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
