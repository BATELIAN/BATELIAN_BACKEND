//Importing the Skill model to the controller
import SkillModel from "../../model/skill.model";
import { Request, Response } from "express";
import {  loop } from "../../utils/db_functions/help";

export const create = async (req: Request, res: Response) => {
  //Destruct the data sent from req.body
  const { name, description} = req.body;

  try {
    if (req.method === "POST") {
      if (req.files) {
        const files = req.files;
        const urls = await loop(files);
        const Skill = await new SkillModel({
          name: name,
          files: urls,
          description: description
        });

        Skill.save();
        return res.status(201).json({
          success: true,
          message: "Skill created sucessfully",
          data: Skill,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Image is required",
        });
      }
    } else {
      return res.status(405).json({
        err: `${req.method} method not allowed`,
      });
    }
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error,
    });
  }
};
