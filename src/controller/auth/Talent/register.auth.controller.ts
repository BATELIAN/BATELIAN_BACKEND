// import { Request, Response } from "express";

// //Importing the express-async-handler package

// //Importing the bcrypt package
// import bcrypt from "bcrypt";

// //Importing the user model
// import UserModel from "../../../model/talent.model";
// import { showUsersbyEmail } from "../../../utils/db_functions/talent.db";

// export const register = async (req: Request, res: Response) => {
//   //Destructuing the inputs from req.body
//   const {
//     fullName,
//     email,
//     password,
//     phoneNumber
//   }: {
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber: string
//   } = req.body;

//   //Verifying the email address inputed is not used already

//     const verifyUser = await showUsersbyEmail(email);

//     if (verifyUser) {
//       return res.status(403).json({
//         message: "email already registered",
//       });
//     } else {
//       bcrypt.hash(password, 10).then((hash) => {
//         //Registering the user
//         const user = new UserModel({
//           email: email,
//           fullName: fullName,
//           password: hash,
//           phoneNumber: phoneNumber
          
//         });
//         //saving the data to the mongodb user collection
//         user
//           .save()
//           .then((response) => {
//             return res.status(201).json({
//               message: "user successfully registerd!",
//               response,
//               success: true,
//             });
//           })
//           .catch((error) => {
//             res.status(500).json({
//               error: error,
//             });
//           });
//       });
//     }
// };
