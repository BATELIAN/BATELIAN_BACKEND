import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../../model/client.model';
import { sendMail } from "../../../utils/sendMail";
import { generateRandom4DigitString } from "../../../utils/util";


//@access public
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, fullName, phoneNumber } = req.body
    const userExists = await UserModel.findOne({ email: email })
    if (userExists) return res.status(404).json({ message: 'user already exist', success: false })
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const code = generateRandom4DigitString()
    const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60
    
    const response = await new UserModel({
      email: email, 
      fullName: fullName, 
      phoneNumber: phoneNumber,
      password: hashPassword,
      verificationCode: code,
      verificationCodeExpires: Date.now() + verificationExpires,
    });
    if(response){
      response.save()
    }

    await sendMail({
      email: email,
      subject: "Email verification",
      template: "emailVerification.mails.ejs",
      data: {
        user: response.fullName,
        code,
      },
    });
  res.status(201).json({ success: true, message: 'Verification email sent', email: email })
}

