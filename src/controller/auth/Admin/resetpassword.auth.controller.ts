import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import UserModel from "../../../model/admin.model"


//@desc reset password
//@method POST  /customer-auth/resetPassword
//@access public
export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { email, passwordResetCode, password } = req.body;
    const user = await UserModel.findOne({email: email})
    if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordResetCode ||
        user.verificationCodeExpires < Date.now()
    ) {
        return res.status(405).json({
            message: 'Could not reset user password',
            success: false
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    user.password = hashPassword;
    user.passwordResetCode = null;
    await user.save();

    res.status(201).json({ message: 'Password updated successfully', sccuses: true });
}
