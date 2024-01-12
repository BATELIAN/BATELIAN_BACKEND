//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const updatecertfication = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { title, issuedBy, description, issuedDate,  } = req.body;
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const certficationData = {
            title: title,
            issuedBy: issuedBy,
            description: description,
            issuedDate: issuedDate,
        }

        const profile = await ProfileModel.findOne({ userId: userId });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        // Find the certfication object within the profile's certfication array
        const certficationToUpdate = profile.certfication.find(
            (cert) => cert._id.toString() === id
        );

        // Check if the certfication object exists
        if (!certficationToUpdate) {
            return { success: false, message: 'certfication object not found' };
        }

        // Update the certfication object with the new data
        certficationToUpdate.set(certficationData);

        // Save the profile with the updated certfication object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "certfication data saved successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
