import { Request, Response } from "express";
import SkillModel from "../../model/skill.model";
// import  user from "../../model/user"
export const deleteSkill = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const removed = await SkillModel.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res
      .status(200)
      .json({ message: "skill deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
  }
};
