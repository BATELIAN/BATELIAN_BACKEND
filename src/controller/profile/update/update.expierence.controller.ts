//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const updateExpierence = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const {
        company, 
        title,
        type,
        isCurrently,
        description,
        startDate,
        endDate
    } = req.body;

    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const experienceData = {
            company, 
            title,
            type,
            isCurrently,
            description,
            startDate,
            endDate
        }

        const profile = await ProfileModel.findOne({ userId: userId });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        // Find the education object within the profile's education array
        const experienceToUpdate = profile.experience.find(
            (exp) => exp._id.toString() === id
        );

        // Check if the education object exists
        if (!experienceToUpdate) {
            return { success: false, message: 'Experience object not found' };
        }

        // Update the education object with the new data
        experienceToUpdate.set(experienceData);

        // Save the profile with the updated education object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "experience data saved successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
