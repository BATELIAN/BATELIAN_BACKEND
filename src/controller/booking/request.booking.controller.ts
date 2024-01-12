//Importing the product model to the controller
import ProfileModel from "../../model/profile.model";
import AdminModel from "../../model/admin.model";
import { Request, Response } from "express";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import { showUsersbyId } from "../../utils/db_functions/admin.db";
import { showSingle } from "../../utils/db_functions/profile.db";
import BookingModel from "../../model/booking.model";


export const request = async (req: IncomingMessage, res: Response) => {
  //Destruct the data sent from req.body
  const { userId } = req.userData as UserDataType;

  try {
    if (req.method === "POST") {
        const user = await showSingle(userId)
        if(!user){
            return res.status(404).json({
                message: "user not found", 
                success: false
            })
        } else if (user.completion < 70){
            return res.status(403).json({
                message: "you have to complete your profile", 
                success: false
            })
        }
        //creating the blog
        const booking = await new BookingModel({
          clientId: userId,
          clientName: user.name,
        });

        user.status = "REQUESTING"
        user.save();
        booking.save();
        return res.status(201).json({
          success: true,
          message: "booking request made successfuly",
        });
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
