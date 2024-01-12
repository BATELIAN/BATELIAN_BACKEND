//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { calculateProfileCompletion } from "../../../utils/db_functions/profile.db";

export const createEducation = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { level, type, institution, startDate, endDate, isCurrently, field } = req.body;
    const { userId } = req.userData as UserDataType;
    try {
        if (req.method === "POST") {
            if (req.files) {
                const files = req.files;
                const urls = await Mloop(files);
                const educationData = {
                    level: level,
                    type: type,
                    institution: institution,
                    startDate: startDate,
                    endDate: endDate,
                    isCurrently: isCurrently,
                    field: field,
                    files: urls
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if (!profile) {
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.education.push(educationData)
                profile.completion = calculateProfileCompletion(profile)
                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "education data saved successfully",
                    // data: basic,
                });
            } else {
                const educationData = {
                    level: level,
                    type: type,
                    institution: institution,
                    startDate: startDate,
                    endDate: endDate,
                    isCurrently: isCurrently,
                    field: field,
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if (!profile) {
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.education.push(educationData)
                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "education data saved successfully",
                });
            }
        } else {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
