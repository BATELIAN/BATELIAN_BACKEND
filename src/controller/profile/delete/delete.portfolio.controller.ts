//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const deletePort = async (req: IncomingMessage, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.userData as UserDataType;

    // Find the profile by its ID
    const profile = await ProfileModel.findOne({ userId: userId });

    if (!profile) {
      throw new Error('Profile not found');
    }

    // Find the index of the education object to delete in the education array
    const portIndexToDelete = profile.portfolio.findIndex(
      (port) => port._id.toString() === id
    );

    if (portIndexToDelete === -1) {
      throw new Error('portfolio not found');
    }

    // Remove the education object from the education array
    profile.portfolio.splice(portIndexToDelete, 1);

    // Save the updated profile
    await profile.save();
    return res
      .status(200)
      .json({ message: "Portfolio deleted successfully", success: true });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "`Error deleting portfolio" + error, success: true });
  }
}
