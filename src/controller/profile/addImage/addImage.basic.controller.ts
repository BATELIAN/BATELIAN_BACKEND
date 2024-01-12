import { Request, Response } from "express";
//Imporing file system library
import { Mloop, loop } from "../../../utils/db_functions/help";
import ProfileModel from "../../../model/profile.model";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { showSingle } from "../../../utils/db_functions/profile.db";
import { Profile, education } from "../../../interfaces/profile.interfaces";

export const addprofileImage = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        if (req.files) {
            const files = req.files;
            const urls = await loop(files);
            //we use uuidv4 to generate a random and unique id for the partners
            const verifyItem = await showSingle(userId)

            if (!verifyItem) {
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            verifyItem.files[0] = urls
            verifyItem.save();
            return res.status(201).json({
                success: true,
                message: "image updated sucessfully",
            });
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
