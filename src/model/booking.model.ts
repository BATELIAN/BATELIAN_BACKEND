import { Schema, model } from "mongoose";

const BookingShcema = new Schema({
    clientId: {
        type: String,
    },
    clientName: {
        type: String,
    },   
    assignedBy: {
        type:String, 
        default: ""
    },
    assignedId: {
        type: String,
        default: ""
    },
    assignedLinks: {
        type: String, 
        default: ""
    },
    status: {
        type: String,
        default: "REQUESTING"
    }, 
});

export default model("Booking", BookingShcema);
