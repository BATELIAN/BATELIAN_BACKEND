//Importing the product model to the controller
import { Request, Response } from "express";
import AdminModel from "../../../model/admin.model";

export const DeleteUser = async (req:Request, res:Response) => {
  //Destructing id from req.params
  const { id } = req.params;

  try {
    //Fetching single blog using the id in the req.params from the database and assigning it to blog
    const admin = await AdminModel.findOne({_id: id})

    if(!admin){
      return res.status(404).send({
        message: "user not found", 
        sucess: false
      })
    }

    admin.status = "DELETED"
    admin.role = "NOT_USER"
    admin.save()
    //Since there is no data to be responde we simple send a message
    return res.status(200).json({
      success: true,
      message: "User deleted sucessfully",
    });
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
}
