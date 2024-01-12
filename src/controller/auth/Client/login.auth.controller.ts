import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../../model/client.model"
import { signJwt } from "../../../utils/jwt";
import ClientProfileModel from "../../../model/profile.model"
//@desc  login customer
//@method POST  /customer-auth/login
//@access public
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userExist = await UserModel.findOne({ email: email })
    if (!userExist) return res.status(404).json({ message: 'User doesnt exist', success: false })
    const profileExist = await ClientProfileModel.findOne({ userId: userExist._id })
    if(profileExist){ 
        userExist.isActive = true
        userExist.save()
    } 
    if (!userExist.isActive) return res.status(404).json({ message: 'verify your email first', success: false })
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) return res.status(404).json({ message: "Invalid credential", success: false });
    const toBeSignedData = {
        userId: userExist._id,
    }
    const accessToken = signJwt(
        toBeSignedData,
        process.env.JWTC_SECRET as string,
        {
            expiresIn: "3d"
        })

    delete userExist.password;
    res.status(201).json({
        success: true,
        user: userExist,
        message: "logged in successfully",
        accessToken

    })

}