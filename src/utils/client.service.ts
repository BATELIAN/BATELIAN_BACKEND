import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserModel from "../model/client.model";
import ClientProfileModel from "../model/profile.model"


export async function createProfile(userId: string, email: string) {
    try {
        const result = await new ClientProfileModel({userId: userId, email: email})
        result.save()
        return { data: result, sucess: true }
    } catch (error) {
        return { data: null, sucess: false }
    }
}

