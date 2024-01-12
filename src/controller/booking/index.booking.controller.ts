import { getRequest, singleRequest, Myclients } from "./getrequest.booking.controller";
import { assign } from "./assign.booking.controller"
import { request } from "./request.booking.controller"
import { Scheduled } from "./change.booking.controller"
import { Ongoing } from "./change.ongoing.booking.controller"
import { success } from "./change.sucess.booking.controller"
import { fail } from "./change.fail.booking.controller"
import { getCalbooking } from "./cal.booking.controller"

export {
    getRequest, assign, request, singleRequest, Myclients,
    Scheduled, Ongoing, success, fail, getCalbooking
}