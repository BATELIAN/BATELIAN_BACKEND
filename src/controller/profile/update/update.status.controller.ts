//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const verified = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.bod
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const profile = await ProfileModel.findOne({ userId: id });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        profile.status = "VERIFIED"
        // Save the profile with the updated education object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "status changed successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};


export const Unverified = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.bod
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const profile = await ProfileModel.findOne({ userId: id });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        profile.status = ""
        // Save the profile with the updated education object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "status changed successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};