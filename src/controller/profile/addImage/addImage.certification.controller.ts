import { Request, Response } from "express";
//Imporing file system library
import { Mloop } from "../../../utils/db_functions/help";
import ProfileModel from "../../../model/profile.model";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { showSingle } from "../../../utils/db_functions/profile.db";
import { Profile, education } from "../../../interfaces/profile.interfaces";

export const addCertImage = async (req: IncomingMessage, res: Response) => {
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
            const urls = await Mloop(files);
            //we use uuidv4 to generate a random and unique id for the partners
            const verifyItem = await showSingle(userId)
            const certfication = verifyItem.certfication

            if (!verifyItem) {
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            let url = {}
            urls.forEach((u) => {
                url = u
            });
            if(!certfication){
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            const certObject = certfication.filter((e)=> e._id.toString() === id)
            const filesarray = certObject[0].files
            filesarray.push(url);
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
