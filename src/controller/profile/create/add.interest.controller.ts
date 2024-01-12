import { Response } from 'express';
import { IncomingMessage, UserDataType } from '../../../middleware/authJWT';
import ProfileModel from '../../../model/profile.model'; // Import your Profile model and the 'interest' type
import { showSingle } from '../../../utils/db_functions/profile.db';
import { interest } from '../../../interfaces/profile.interfaces';

// Define a function to add interests to a user's profile
export const addinterest = async (req: IncomingMessage, res: Response) => {
    try {
        // Find the user's profile by their userId
        const interestsData = req.body
        const { id } = req.params
        const { userId } = req.userData as UserDataType;

        const user = await showSingle(userId);

        if (!user) {
            return res.status(405).json({
                message: 'User profile not found',
                sucess:false
            });
        }

        // Map the provided data to the 'interest' type
        const interests: interest = {
            opportunityType: Object.keys(interestsData.opportunityType).filter(
                (key) => interestsData.opportunityType[key]
            ),
            awardCoverage: Object.keys(interestsData.awardCoverage).filter(
                (key) => interestsData.awardCoverage[key]
            ),
            country: Object.keys(interestsData.country).filter(
                (key) => interestsData.country[key]
            ),
            salaryType: Object.keys(interestsData.salaryType).filter(
                (key) => interestsData.salaryType[key]
            ),
        };

        // Update the user's interests
        // const single = user.interest[0]
        user.interest.push(interests);
        // Save the updated profile
        const updatedProfile = await user.save();

        return res.status(201).json({
            message:"interest addedd sucessfully",
            sucess: true
        });
    } catch (error) {
        throw error; // Handle or log the error as needed
    }
}


