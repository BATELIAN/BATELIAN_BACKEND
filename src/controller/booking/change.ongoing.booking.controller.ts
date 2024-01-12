import BlogModel from "../../model/blog.model";
import { Request, Response } from "express";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import bookingModel from "../../model/booking.model";
import { showSingle } from "../../utils/db_functions/profile.db";

export const Ongoing = async (req: IncomingMessage, res: Response) => {   
    //Destructing the id from req.params
    const { id } = req.params
    //assigning the specfic product to variable called product
    const booking = await bookingModel.findOne({ _id: id });
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                err: `${req.method} method not allowed`,
            });
        }
        if (!booking && booking.status !== "SCHEDULED") {
            return res.status(404).json({
                success: false,
                message: "booking not found",
            });
        }
        const profile = await showSingle(booking.clientId);
        if (!profile) {
            return res.status(404).json({
                message: "profile not  found",
                success: false
            })
        }
        profile.status = "ONGOING"
        profile.save()
        booking.updateOne({
            status: "ONGOING"
        }, { useFindAndModify: false }).then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update booking with id=${id}. Maybe booking was not found!`,
                });
            } else
                return res
                    .status(201)
                    .json({ message: "status changed  successfully." });
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}
