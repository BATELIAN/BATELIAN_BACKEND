import { Request, Response } from "express";
//Importing the bcrypt package
import bcrypt from "bcrypt";

import { sendMail } from "../../../utils/sendMail";
import { generateRandom4DigitString } from "../../../utils/util";
// Importing usermodel from user
import UserModel from "../../../model/admin.model";
// import { IncomingMessage, UserDataType } from "../../../middleware/authJWT";


export const forgetPassword = async (req: Request, res: Response) => {
    
    const message =
        "If a user with that email is registered you will receive a password reset email";
    //Destructing the inputs from req.body
    const { email } = req.body
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(404).json({
            message: "user not found",
            success: false
        })
    }

    if (!user.isActive) {
        return res.status(405).json({
            message: "Verify your email first",
            success: false
        })

    }

    const code = generateRandom4DigitString()
    const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60
    user.passwordResetCode = code
    user.firstTimeLogin = true
    user.verificationCodeExpires = Date.now() + verificationExpires;
    const link = `https://customer.ohubet.com/auth/reset?passwordResetCode=${code}&email=${encodeURIComponent(email)}`;

    await user.save()

    await sendMail({
        email: email,
        subject: "Password reset code",
        template: "passwordReset.mails.ejs",
        data: {
            user: user.fullName,
            code,
            link,
        },
    });
    res.status(201).json({ message, success: true })


}