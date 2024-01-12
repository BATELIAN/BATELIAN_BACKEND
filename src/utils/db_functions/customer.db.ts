import CustomerModel from "../../model/customer.model";

export async function getAll() {
  try {
    const items = await CustomerModel.find();
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {
    const item = await CustomerModel.findById(id);
    return item;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}



