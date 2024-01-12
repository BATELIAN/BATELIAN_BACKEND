//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import {  Response } from "express";

import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const createSkills = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { 
        skills,
        level,
        istopSkils
    } = req.body;
    const { userId } = req.userData as UserDataType;

    try {
        if (req.method === "POST") {
            if (req.body.length === 0) {
                return res.status(405).json({
                    success: "false",
                    message: `input not valid`,
                });
            }
            const skillsData = {
                skills: skills,
                level: level,
                istopSkils: istopSkils
            }
            const profile = await ProfileModel.findOne({ userId: userId });
            if (!profile) {
                return res.status(201).json({
                    success: true,
                    message: "profile data not found",
                });
            }
            profile.skills.push(skillsData)
            await profile.save();
            // basic.save();
            return res.status(201).json({
                success: true,
                message: "skills data saved successfully",
                // data: basic,
            });

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
