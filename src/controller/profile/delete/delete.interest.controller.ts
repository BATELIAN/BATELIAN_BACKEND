import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const deleteInterest = async (req: IncomingMessage, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.userData as UserDataType;

    // Find the profile by its ID
    const profile = await ProfileModel.findOne({ userId: userId });

    if (!profile) {
      throw new Error('Profile not found');
    }

    // Find the index of the education object to delete in the education array
    const interestIndexToDelete = profile.interest.findIndex(
      (interest) => interest._id.toString() === id
    );

    if (interestIndexToDelete === -1) {
      throw new Error('Interest not found');
    }

    // Remove the interest object from the interest array
    profile.interest.splice(interestIndexToDelete, 1);

    // Save the updated profile
    await profile.save();
    return res
      .status(200)
      .json({ message: "Interest deleted successfully", success: true });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "`Error deleting interest" + error, success: true });
  }
}
