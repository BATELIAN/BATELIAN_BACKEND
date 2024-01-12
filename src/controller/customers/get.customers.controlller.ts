import { getAll, showSingle } from "../../utils/db_functions/customer.db";
import { Request, Response } from "express";

//Get all blogs async function
export const getRequests = async (req:Request, res:Response) => {
  //Fetching all blogs from the database and assigning it to blogs
  const blogs = await getAll();
  //Responding the data to any request made
  return res.status(200).json(blogs.reverse())
  //I use .reverse() function to get the latest datas at first
};

export const showRequests = async (req:Request, res:Response) => {
  //Fetching all blogs from the database and assigning it to blogs
const { id } = req.params

  const single = await showSingle(id);
  //Responding the data to any request made
  return res.status(200).json(single)
  //I use .reverse() function to get the latest datas at first
};

