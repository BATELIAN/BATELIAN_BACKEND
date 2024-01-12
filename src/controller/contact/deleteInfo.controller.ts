import { Request, Response } from "express";
import ContactInfoModel from "../../model/contactInfo.model";
// import  user from "../../model/user"
export const deleteInfo = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const removed = await ContactInfoModel.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res
      .status(200)
      .json({ message: "contact info deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
  }
};
