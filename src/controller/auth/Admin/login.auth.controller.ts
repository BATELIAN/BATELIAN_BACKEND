import { Request, Response } from "express";

//Importing JWT from Json Web Token package
import jwt from "jsonwebtoken";

//Importing the bcrypt package
import bcrypt from "bcrypt";

// Importing usermodel from user
// import UserModel from "../../../model/admin.model";
import { showUsersbyEmail } from "../../../utils/db_functions/admin.db";
import { AdminModelID } from "../../../interfaces/admin.interface";

export const login = async (req: Request, res: Response) => {
  //Destructing the inputs from req.body
  const { email, password } = req.body;
  const getUser: AdminModelID | null = await showUsersbyEmail(email);
  if (!getUser || getUser.status === "DELETED") {
    //if user does not exist responding Authentication Failed
    return res.status(403).json({
      message: "Authentication Failed",
    });
  }
  return bcrypt
    .compare(password, getUser.password)
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        const jwtToken = jwt.sign(
          {
            userId: getUser._id,
            firstTimeLogin: getUser.firstTimeLogin, 
            email: email, 
            role:getUser.role,

          },
          //Signign the token with the JWT_SECRET in the .env
          process.env.JWTA_SECRET as string,
          {
            expiresIn: "3d",
          }
        );
        return res.status(200).json({
          accessToken: jwtToken,
          userId: getUser._id,
          firstTimeLogin: getUser.firstTimeLogin, 
          role: getUser.role
        });

      }
    })
    .catch((err) => {
      return res.status(401).json({
        messgae: err.message,
        success: false,
      });
    });
};
