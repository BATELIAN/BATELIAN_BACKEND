

//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import {  Response } from "express";
import { loop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { calculateProfileCompletion } from "../../../utils/db_functions/profile.db";

export const createPortfolio = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { title,
        link,
        description,
        startDate,
        endDate } = req.body;
        const { userId } = req.userData as UserDataType;



    try {
        if (req.method === "POST") {
            if (req.files) {
                const files = req.files;
                const urls = await loop(files);
                if (req.body.length === 0) {
                    return res.status(405).json({
                        success: "false",
                        message: `input not valid`,
                    });
                }
                const portfolioData = {
                    title : title,
                    link : link,
                    files: urls,
                    description :description,
                    startDate : startDate,
                    endDate : endDate
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if(!profile){
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.portfolio.push(portfolioData)
                profile.completion = calculateProfileCompletion(profile)

                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "portfolio data saved successfully",
                    // data: basic,
                });
            } else {
                const portfolioData = {
                    title : title,
                    link : link,
                    description :description,
                    startDate : startDate,
                    endDate : endDate
                }
                const profile = await ProfileModel.findOne({ userId: userId });
                if(!profile){
                    return res.status(201).json({
                        success: true,
                        message: "profile data not found",
                    });
                }
                profile.portfolio.push(portfolioData)
                await profile.save();
                return res.status(201).json({
                    success: true,
                    message: "portfolio data saved successfully",
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
