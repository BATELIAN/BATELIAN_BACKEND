import EventModel from "../../model/event.model";

export async function getAll() {
  try {
    const items = await EventModel.find();
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {
    const items = await EventModel.findById(id);
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}
