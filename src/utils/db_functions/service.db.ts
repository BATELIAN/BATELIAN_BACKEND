import ServiceModel from "../../model/service.model";

export async function getAll() {
  try {
    const items = await ServiceModel.find();
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {
    const items = await ServiceModel.findById(id);
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}
