import BlogModel from "../../model/blog.model";

export async function getAll() {
  try {
    const items = await BlogModel.find();
    return items;
  } catch (error) {
    // Handle error
    console.error("Error retrieving folders:", error);
    throw error;
  }
}

export async function showSingle(id: string) {
  try {
    const item = await BlogModel.findById(id);
    return item;
  } catch (error) {
    // Handle error
    console.error("Error retrieving MenuType:", error);
    throw error;
  }
}



