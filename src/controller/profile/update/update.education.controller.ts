//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const updateEducation = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { level, type, instituation, startDate, endDate, isCurrently, field } = req.body;
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const educationData = {
            level: level,
            type: type,
            institution: instituation,
            startDate: startDate,
            endDate: endDate,
            isCurrently: isCurrently,
            field: field,
        }

        const profile = await ProfileModel.findOne({ userId: userId });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        // Find the education object within the profile's education array
        const educationToUpdate = profile.education.find(
            (edu) => edu._id.toString() === id
        );

        // Check if the education object exists
        if (!educationToUpdate) {
            return { success: false, message: 'Education object not found' };
        }

        // Update the education object with the new data
        educationToUpdate.set(educationData);

        // Save the profile with the updated education object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "education data saved successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
