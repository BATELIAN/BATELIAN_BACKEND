// import { Request, Response } from "express";
// //Importing the express-async-handler package
// import { getAllUsers, showUsersbyId } from "../../../utils/db_functions/talent.db";

// //Importing the uuidv4 package to generate userId

// export const getUsers = async (req:Request, res:Response) => {
//   const user = await getAllUsers();

//   res.status(200).json(user);
// };

// export const getuser = async (req:Request, res:Response) => {
//   const { id } = req.params
//   const user = await showUsersbyId(id);
//   res.status(200).send(user);
// };
