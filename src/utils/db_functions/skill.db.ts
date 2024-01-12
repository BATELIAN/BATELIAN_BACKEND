import SkillModel from "../../model/skill.model";

export async function getAll() {
  try {
    const items = await SkillModel.find();
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {
    const items = await SkillModel.findById(id);
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}



