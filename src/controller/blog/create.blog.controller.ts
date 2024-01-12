//Importing the product model to the controller
import BlogModel from "../../model/blog.model";
import { Request, Response } from "express";
import { Mloop } from "../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import { showUsersbyId } from "../../utils/db_functions/admin.db";

export const create = async (req: IncomingMessage, res: Response) => {
  //Destruct the data sent from req.body
  const { title, description, links, body} = req.body;
  const { userId } = req.userData as UserDataType;

  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        const urls = await Mloop(files);
        const user = await showUsersbyId(userId)
        //creating the blog
        const blog = await new BlogModel({
          title: title,
          description: description,
          body: body,
          links: links,
          files: urls,
          author: user.fullName
        });

        blog.save();
        return res.status(201).json({
          success: true,
          message: "blog created sucessfully",
          blog,
        });
      } else {
        const user = await showUsersbyId(userId)
        const blog = await new BlogModel({
          title: title,
          description: description,
          body: body,
          links: links,
          author: user.fullName
        });

        blog.save();
        return res.status(201).json({
          success: true,
          message: "blog created sucessfully",
          blog,
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
