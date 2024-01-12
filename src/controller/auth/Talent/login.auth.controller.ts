// import { Request, Response } from "express";

// //Importing JWT from Json Web Token package
// import jwt from "jsonwebtoken";

// //Importing the bcrypt package
// import bcrypt from "bcrypt";

// // Importing usermodel from user
// import {  TalentModelID } from "../../../interfaces/talent.interface";
// import { showUsersbyEmail } from "../../../utils/db_functions/talent.db";

// export const login = async (req: Request, res: Response) => {
//   //Destructing the inputs from req.body
//   const { email, password } = req.body;
//   const getUser: TalentModelID | null = await showUsersbyEmail(email);
//   if (!getUser) {
//     //if user does not exist responding Authentication Failed
//     return res.status(403).json({
//       message: "Authentication Failed",
//     });
//   }
//   return bcrypt
//     .compare(password, getUser.password)
//     .then((response) => {
//       if (!response) {
//         return res.status(401).json({
//           message: "Authentication Failed",
//         });
//       } else {
//         const jwtToken = jwt.sign(
//           {
//             getUser: getUser,
//           },
//           //Signign the token with the JWT_SECRET in the .env
//           process.env.JWT_SECRET as string,
//           {
//             expiresIn: "24h",
//           }
//         );
//         return res.status(200).json({
//           accessToken: jwtToken,
//           userId: getUser._id,
//         });
//       }
//     })
//     .catch((err) => {
//       return res.status(401).json({
//         messgae: err.message,
//         success: false,
//       });
//     });
// };
