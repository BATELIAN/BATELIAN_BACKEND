import ProfileModel from "../../../model/profile.model";
import { Response } from "express";
import { loop } from "../../../utils/db_functions/help";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { calculateProfileCompletion, showSingle } from "../../../utils/db_functions/profile.db";
import { showUsersbyId } from "../../../utils/db_functions/client.db";
export const createBasic = async (req: IncomingMessage, res: Response) => {
    const { name, country, city, bio, birthDate, linkedin, github } = req.body;
    const { userId } = req.userData as UserDataType;
    if (req.method !== "POST") {
        return res.status(405).json({
            err: `${req.method} method not allowed`,
        });
    }
    try {
        const user = await showUsersbyId(userId)
        const profile = await showSingle(userId)
        let urls;
        if (req.files) {
            urls = await loop(req.files);
        }
        const data = {
            userId: userId,
            name: name,
            country: country,
            files: urls,
            city: city,
            bio: bio,
            birthDate: birthDate,
            linkedin: linkedin,
            email: user.email
        }
        if (!profile) {
            const basic = await new ProfileModel(data);
            basic.completion = calculateProfileCompletion(data)
            basic.save()
            return res.status(201).json({
                success: true,
                message: "basic-info saved",
                data: basic,
            });
        } else {
            profile.updateOne(data, { useFindAndModify: false }).then((data) => {
                if (!data) {
                    return res.status(404).send({
                        message: `profile not found`,
                        success: false
                    });
                } else
                    return res
                        .status(201)
                        .json({ message: "profile updated successfully." });
            });
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }

}