import { Request, Response } from "express";
import { getAll, showSingle } from "../../utils/db_functions/about.db";

export const getAbouts = async (req: Request, res: Response) => {
  const folders = await getAll();
  res.status(200).send(folders);
};

export const getAbout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const folder = await showSingle(id);
  res.status(200).send(folder);
};
