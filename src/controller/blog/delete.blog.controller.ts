//Importing the product model to the controller
import { Request, Response } from "express";
import BlogModel from "../../model/blog.model";

export const deleteblog = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  try {
    //Fetching single blog using the id in the req.params from the database and assigning it to blog
    await BlogModel.deleteOne({ _id: id });

    //Since there is no data to be responde we simple send a message
    return res.status(200).json({
      success: true,
      message: "blog deleted sucessfully",
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
}
