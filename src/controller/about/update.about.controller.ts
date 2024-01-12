//Importing the product model to the controller
import AboutModel from "../../model/about.model";

// Importing the the cloudinary config
// import { uploads } from "../../config/cloudinary";

//Imporing file system library
// import fs from "fs";
import { Request, Response } from "express";


export const update = async (req: Request, res: Response) => {

  const { title, description } = req.body
  //Destructing the id from req.params
  const updateData = {
    title,
    description,

  }
  const { id } = req.params;
  //assigning the specfic about to variable called about
  const about = await AboutModel.findOne({ _id: id });

  if (req.method !== "PUT") {
    return res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }

  try {
    if (!about) {
      return res.status(400).json({
        success: false,
        message: "about not found",
      });
    }


    about.updateOne(updateData, { useFindAndModify: false }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update about with id=${id}. Maybe about was not found!`,
        });
      } else
        return res.status(201).json({ message: "about updated successfully." });
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
