import BlogModel from "../../model/blog.model";
import { Request, Response } from "express";

export const update = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body 
  const { title, description, body, links } = req.body
  //Destructing the id from req.params
  const { id } = req.params
  const updateData = {
    title,
    description,
    body,
    links,
  }
  //assigning the specfic product to variable called product
  const blog = await BlogModel.findOne({ _id: id });

  try {
    if (req.method !== "PUT") {
      return res.status(405).json({
        err: `${req.method} method not allowed`,
      });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }
 
    blog.updateOne(updateData, { useFindAndModify: false }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update blog with id=${id}. Maybe blog was not found!`,
        });
      } else
        return res
          .status(201)
          .json({ message: "blog updated successfully." });
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message
    })
  }
}
