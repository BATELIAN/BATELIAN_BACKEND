import { Request, Response } from "express";
import { generateRandom4DigitString } from "../../../utils/util";
import bcrypt from "bcrypt";
import UserModel from "../../../model/admin.model";
import { sendMail } from "../../../utils/sendMail";

export const register = async (req: Request, res: Response) => {
  const { email,  fullName, phoneNumber,role,calLink, calApiKey } = req.body
    const userExists = await UserModel.findOne({ email: email })
    if (userExists) return res.status(404).json({ message: 'user already exist', success: false })
    const password = generateRandom4DigitString()
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const response = await new UserModel({
      role:role,
      calLink:calLink,
      calApiKey:calApiKey,
      email: email, 
      fullName: fullName, 
      phoneNumber: phoneNumber,
      password: hashPassword,
    });
    if(response){
      response.save()
    }
    await sendMail({
      email: email,
      subject: "Email verification",
      template: "password.mails.ejs",
      data: {
        user: response.fullName,
        password,
        email
      },
    });
  res.status(201).json({ success: true, message: 'Verification email sent', email: email })
};
