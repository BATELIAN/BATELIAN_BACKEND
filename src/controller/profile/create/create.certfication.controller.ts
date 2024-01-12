
//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { Mloop, loop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { calculateProfileCompletion } from "../../../utils/db_functions/profile.db";

export const createCertfication = async (req: IncomingMessage, res: Response) => {
    const { title,
        issuedBy,
        description,
        issuedDate, } = req.body;
    const { userId } = req.userData as UserDataType;
    try {
        if (req.method === "POST") {
            if (req.files) {
                const files = req.files;
                const urls = await Mloop(files);
                if (req.body.length === 0) {
                    return res.status(405).json({
                        success: "false",
                        message: `input not valid`,
                    });
                }
                const certficationData = {
                    title: title,
                    issuedBy: issuedBy,
                    files: urls,
                    description: description,
                    issuedDate: issuedDate,
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if (!profile) {
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.certfication.push(certficationData)
                profile.completion = calculateProfileCompletion(profile)

                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "certification data saved successfully",
                });
            } else {
                const certficationData = {
                    title: title,
                    issuedBy: issuedBy,
                    description: description,
                    issuedDate: issuedDate,
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if (!profile) {
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.certfication.push(certficationData)
                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "certfication data saved successfully",
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
