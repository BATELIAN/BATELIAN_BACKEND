//Importing the hero model to the controller
import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";

export const updateportfolio = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { title, link, description, startDate, endDate} = req.body;
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        const portfolioData = {
            title : title,
            link : link,
            description :description,
            startDate : startDate,
            endDate : endDate
        }

        const profile = await ProfileModel.findOne({ userId: userId });

        // Check if the profile exists
        if (!profile) {
            return { success: false, message: 'Profile not found' };
        }

        // Find the portfolio object within the profile's portfolio array
        const portfolioToUpdate = profile.portfolio.find(
            (edu) => edu._id.toString() === id
        );

        // Check if the portfolio object exists
        if (!portfolioToUpdate) {
            return { success: false, message: 'portfolio object not found' };
        }

        // Update the portfolio object with the new data
        portfolioToUpdate.set(portfolioData);

        // Save the profile with the updated portfolio object
        await profile.save();
        return res.status(201).json({
            success: true,
            message: "portfolio data saved successfully",
            // data: basic,
        });

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
