import { Request, Response } from "express";
import { sendMail } from "../../../utils/sendMail";
import { generateRandom4DigitString } from "../../../utils/util";
import UserModel from "../../../model/client.model";


//@desc forgot passowrd for customer
//@method POST  /customer-auth/forgetPassword
//@access public
export const forgotPassword = async (req: Request, res: Response) => {
    const message =
        "If a user with that email is registered you will receive a password reset email";

    const { email } = req.body;
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


