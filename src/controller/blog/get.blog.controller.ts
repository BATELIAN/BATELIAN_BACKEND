import { getAll, showSingle } from "../../utils/db_functions/blog.db";
import { Request, Response } from "express";

//Get all blogs async function
export const getBlogs = async (req:Request, res:Response) => {
  //Fetching all blogs from the database and assigning it to blogs
  const blogs = await getAll();
  //Responding the data to any request made
  return res.status(200).json(blogs.reverse())
  //I use .reverse() function to get the latest datas at first
};

//Get Single blog
export const showBlogs = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  //Fetching single blog using the id in the req.params from the database and assigning it to blog
  const blog = await showSingle(id);

  try {
    if (blog) {
      //Responding the data to any request made
      return res.status(200).json(blog)
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};
