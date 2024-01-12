//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { calculateProfileCompletion } from "../../../utils/db_functions/profile.db";
export const createExpierence = async (req: IncomingMessage, res: Response) => {
    const { company,
        title,
        type,
        startDate,
        endDate,
        isCurrently,
        description
    } = req.body;
    const { userId } = req.userData as UserDataType;
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                success: false,
                message: `${req.method} method not allowed`,
            });
        }

        if (req.body.length === 0) {
            return res.status(405).json({
                success: "false",
                message: `input not valid`,
            });
        }
        const expierenceData = {
            company: company,
            title: title,
            type: type,
            startDate: startDate,
            endDate: endDate,
            isCurrently: isCurrently,
            description: description
        }
        const profile = await ProfileModel.findOne({ userId: userId });
        if (!profile) {
            return res.status(201).json({
                success: true,
                message: "profile data not found",
            });
        }
        profile.experience.push(expierenceData)
        profile.completion = calculateProfileCompletion(profile)

        await profile.save();
        return res.status(201).json({
            success: true,
            message: "expierence data saved successfully",
        });
    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
