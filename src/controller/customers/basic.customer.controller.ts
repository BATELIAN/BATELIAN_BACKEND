import CustomerModel from "../../model/customer.model";
import { Response, Request } from "express";
import { sendMail } from "../../utils/sendMail";

export const createBasic = async (req: Request, res: Response) => {
    const {
        workEmail,
        companyName,
        companySize,
        employeeName,
        phoneNumber,
        skill,
        location,
        jobType,

    } = req.body;

    if (req.method !== "POST") {
        return res.status(405).json({
            err: `${req.method} method not allowed`,
        });
    }
    try {
        const data = {
            workEmail: workEmail,
            companyName: companyName,
            companySize: companySize,
            employeeName: employeeName,
            phoneNumber: phoneNumber,
            skill: skill,
            location: location,
            jobType: jobType,
        }
        const basic = await new CustomerModel(data);
        basic.save()
        await sendMail({
            email: workEmail,
            subject: "Email verification",
            template: "thankyou.mail.ejs",
            data: {
              user: employeeName,
            },
          });
        return res.status(201).json(basic)

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error,
        });
    }

}