import { Response } from "express";
import { IncomingMessage, UserDataType } from "../../middleware/authJWT";
import CustomerModel from "../../model/customer.model";
import axios from 'axios'

export async function myCalBookingsFn(apiKey) {
    return (await axios
      .get("https://api.cal.com/v1/bookings?apiKey="+apiKey)
      .then((res) => res.data.bookings));
  }


export const getCalbooking = async (req: IncomingMessage, res: Response) => {
    const { userId } = req.userData as UserDataType;
    const booking = await CustomerModel.findOne({ assignedId: userId });
    if(!booking) {
        return res.status(200).json([])
    }
    const calApiKey = booking.calApiKey
    try {
        console.log("asasds")
        const calResponse = await myCalBookingsFn(calApiKey)
        console.log("calResponse",calResponse)
        return res.status(201).json(calResponse);
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error
        })
    }
}
