import { Request, Response } from "express";
import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";
import { showSingle } from "../../../utils/db_functions/profile.db";

export const deleteportImage = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body 
    // const uploader = async (path) => await uploads(path, "Images")
    const { portId, id } = req.params
    try {

        const { userId } = req.userData as UserDataType;

        if (req.method === 'DELETE') {

            //we use uuidv4 to generate a random and unique id for the blogs
            const verifyItem = await showSingle(userId)
            const portfolio = verifyItem.portfolio
            if (!verifyItem) {
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }

            const portObject = portfolio.filter((e) =>
                e._id.toString() === portId
            )
            if (!portfolio) {
                return res.status(404).json({
                    message: "profile not found",
                    status: false,
                });
            }
            const filesarray = portObject[0].files
            const newfilesarray = filesarray.filter((image) =>
                image.id !== "Images/" + id
            )
            verifyItem.portfolio.filter((e) =>
                e._id.toString() === portId
            )[0].files = newfilesarray
            verifyItem.save()
            return res.status(201).json({
                success: true,
                message: "image deleted sucessfully",
            })
        } else {
            return res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error
        })
    }

}
