import { Request, Response } from "express";
import { showSingle } from "../../utils/db_functions/about.db";
export const deleteImage = async (req:Request, res:Response) => {
    //Destruct the data sent from req.body 
    // const uploader = async (path) => await uploads(path, "Images")
    const { aboutId, id} = req.params
    try {

        if (req.method === 'DELETE') {
           
            //we use uuidv4 to generate a random and unique id for the abouts
            const verifyabout = await showSingle(aboutId); 
            if(!verifyabout){
                return res.status(404).json({
                    message: "about not found", 
                    status: false
                })
            }
            const filesarray = verifyabout.files
            const newfilesarray = filesarray.filter((image)=>
                image.id !== "Images/" + id
            )
            verifyabout.files = newfilesarray
            verifyabout.save()
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
