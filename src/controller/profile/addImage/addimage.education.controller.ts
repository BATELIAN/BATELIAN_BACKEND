import { Request, Response } from "express";
//Imporing file system library
import { Mloop, loop } from "../../../utils/db_functions/help";
import ProfileModel from "../../../model/profile.model";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { showSingle } from "../../../utils/db_functions/profile.db";
import { Profile, education } from "../../../interfaces/profile.interfaces";

export const addImage = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body
    const { userId } = req.userData as UserDataType;
    const { id } = req.params
    try {
        if (req.files) {
            const files = req.files;
            const urls = await loop(files);
            const verifyItem = await showSingle(userId)
            const education = verifyItem.education

            if (!verifyItem) {
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            if(!education){
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            const eduObject = education.filter((e)=> e._id.toString() === id)
            const filesarray = eduObject[0].files
            filesarray.push(urls);
            verifyItem.save();
            return res.status(201).json({
                success: true,
                message: "image added sucessfully",
            });
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }
};
