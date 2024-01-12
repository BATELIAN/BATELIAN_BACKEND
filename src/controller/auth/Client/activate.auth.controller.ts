import { Request, Response } from "express";
import UserModel from "../../../model/client.model"
import { createProfile} from "../../../utils/client.service"
//@desc  avtivate email for customer
//@method POST  /customer-auth/activate
//@access public
export const activateUser = async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body
    const userExists = await UserModel.findOne({ email: email })
    if (!userExists) return res.status(404).json({ message: 'User doesnt exist', success: false })
    if (userExists.isActive) return res.status(405).json({ message: 'User has already verified', success: false })
    if (userExists.verificationCode !== verificationCode || userExists.verificationCodeExpires < Date.now())
        return res.status(405).json({ message: 'Invalid code', success: false })
    userExists.verificationCode = ""
    userExists.verificationCodeExpires = 0
    userExists.isActive = true
    console.log("userExists",userExists)
    await createProfile(userExists._id.toString(), userExists.email)
    await userExists.save()
    res.status(201).json({ message: 'user verified sucessfully', success: true })

}