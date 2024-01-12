import { Request, Response } from "express";
import AboutModel from "../../model/about.model";
// import  user from "../../model/user"
export const deleteAbout = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const removed = await AboutModel.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res
      .status(200)
      .json({ message: "about deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
  }
};
