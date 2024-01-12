//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const updateInterest = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { name } = req.body;
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const interestData = {
           name
        }

        const profile = await ProfileModel.findOne({ userId: userId });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        // Find the interest object within the profile's interest array
        const interestToUpdate = profile.interest.find(
            (interest) => interest._id.toString() === id
        );

        // Check if the interest object exists
        if (!interestToUpdate) {
            return { success: false, message: 'Interest object not found' };
        }

        // Update the interest object with the new data
        interestToUpdate.set(interestData);

        // Save the profile with the updated interest object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "interest data saved successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
