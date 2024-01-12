import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import customerModel from "../../model/customer.model";
import userModel from "../../model/admin.model";

import { sendMail } from "../../utils/sendMail";

export const assign = async (req: IncomingMessage, res: Response) => {
    //Destruct the data sent from req.body 
    const { userId } = req.userData as UserDataType;

    const { assignedId, calLink } = req.body
    const { id } = req.params
    //assigning the specfic product to variable called product
    const booking = await customerModel.findOne({ _id: id });
    const user = await userModel.findOne({_id: assignedId})
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "booking not found",
            });
        }
        booking.updateOne({
            assignedId: assignedId,
            calLink: calLink,
            calApiKey: user.calApiKey,
            assignedBy: userId,
            status: "ASSIGNED"
        }, { useFindAndModify: false }).then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update booking with id=${id}. Maybe booking was not found!`,
                });
            } else
                return res
                    .status(201)
                    .json({ message: "assined successfully." });
        });

          // Send an email to the customer
    await sendMail({
        email: booking.workEmail,
        subject: "Email verification",
        template: "assigned.mails.ejs",
        data: {
          user: booking.employeeName,
          link: calLink
        },
      });

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}
