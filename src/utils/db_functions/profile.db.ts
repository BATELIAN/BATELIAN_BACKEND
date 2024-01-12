import { Certificate } from "crypto";
import ProfileModel from "../../model/profile.model";

export async function getAll() {
  try {
    const items = await ProfileModel.find();
    return items;
  } catch (error) {
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {

    const items = await ProfileModel.findOne({ userId: id });
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}



export function calculateProfileCompletion(user) {
  const {
    name,
    country,
    city,
    bio,
    birthDate,
    education, 
    skills,
    expierence,
    certfication
  } = user;

  let completion = 0;

  if (name !== "") completion += 8;
  if (country !== "") completion += 8;
  if (city !== "") completion += 8;
  if (bio !== "") completion += 8;
  if (birthDate !== "") completion += 8;
  if (education && education.length > 0) completion += 16;
  if (certfication && certfication.length > 0) completion += 8;
  if (expierence && expierence.length > 0) completion += 16;
  if (skills && skills.length > 2) completion += 8;



  return completion;
};