import { calculateProfileCompletion, getAll, showSingle } from "../../utils/db_functions/profile.db";
import { Request, Response } from "express";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import { showUsersbyId } from "../../utils/db_functions/client.db";

//Get all blogs async function
export const getProfiles = async (req: Request, res: Response) => {
  //Fetching all blogs from the database and assigning it to blogs
  const blogs = await getAll();
  //Responding the data to any request made
  return res.status(200).json(blogs.reverse())
  //I use .reverse() function to get the latest datas at first
};

//Get Single blog
export const myProfile = async (req: IncomingMessage, res: Response) => {
  //Destructing id from req.params
  const { userId } = req.userData as UserDataType;
  //Fetching single blog using the id in the req.params from the database and assigning it to blog
    const profile = await showSingle(userId);
    if (!profile) return res.status(404).json({ message: "profile not found", success: false })
    //Responding the data to any request made
    return res.status(200).json(profile)
};

export const showProfile = async (req: Request, res: Response) => {
  //Destructing id from req.params
  const { id } = req.params
  //Fetching single blog using the id in the req.params from the database and assigning it to blog
  const profile = await showSingle(id);

  try {
    if (profile) {
      //Responding the data to any request made
      return res.status(200).json(profile)
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
};

export const showInerest = async(req: Request, res: Response) => {
  //Destructing id from req.params
  const { id } = req.params
  //Fetching single blog using the id in the req.params from the database and assigning it to blog
  const profile = await showSingle(id);

  try {
    if (profile) {
      //Responding the data to any request made
      const interest = profile.interest
      return res.status(200).json(interest)
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
}