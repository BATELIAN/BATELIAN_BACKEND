//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const deleteSkill = async (req: IncomingMessage, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.userData as UserDataType;

    // Find the profile by its ID
    const profile = await ProfileModel.findOne({ userId: userId });

    if (!profile) {
      throw new Error('Profile not found');
    }

    // Find the index of the education object to delete in the education array
    const skillIndexToDelete = profile.skills.findIndex(
      (exp) => exp._id.toString() === id
    );

    if (skillIndexToDelete === -1) {
      throw new Error('skill not found');
    }

    // Remove the education object from the education array
    profile.skills.splice(skillIndexToDelete, 1);

    // Save the updated profile
    await profile.save();
    return res
      .status(200)
      .json({ message: "skil deleted successfully", success: true });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "`Error deleting skill" + error, success: true });
  }
}
