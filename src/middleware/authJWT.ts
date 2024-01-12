// import { NextFunction, Request, Response } from "express";

import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export interface IncomingMessage extends Request {
  userData?: UserDataType | jwt.JwtPayload | string;
}

export interface UserDataType {
  accessToken: string;
  userId: string, 
  role: string
}

export const AdminauthJWT = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(
      token ? token : "",
      process.env.JWTA_SECRET as string
    );
    req.userData = decoded;
    // console.log("req.userData",req.userData)
    // console.log("userData", req.userData);

    next();
  } catch (err) {
    return res.status(403).json({
      message: "unauthorized crediential",
    });
  }
};


export const ClientauthJWT = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(
      token ? token : "",
      process.env.JWTC_SECRET as string
    );
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "unauthorized crediential",
    });
  }
};


export const TalentauthJWT = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(
      token ? token : "",
      process.env.JWTT_SECRET as string
    );
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    return res.status(403).json({
      message: "unauthorized crediential",
    });
  }
};


export const authJWT = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(
      token ? token : "",
      process.env.JWT_SECRET as string
    );
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    return res.status(403).json({
      message: "unauthorized crediential",
    });
  }
};

export const CAauthJWT = (
  req: IncomingMessage,
  res: Response,
  next: NextFunction
) => {


  const message = "unauthorized crediential"

  let isError = false;
  try {

    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(
      token ? token : "",
      process.env.JWTA_SECRET as string
    );
    req.userData = decoded;

    // console.log("userData", req.userData);
    isError = false

    next();
  } catch (err) {
    isError = true
  }

  if (isError) {
    try {

      const token = req.headers.authorization?.replace("Bearer ", "");
      const decoded = jwt.verify(
        token ? token : "",
        process.env.JWTC_SECRET as string
      );
      req.userData = decoded;

      // console.log("userData", req.userData);
      isError = false
      next();
    } catch (err) {
      return res.status(403).json({
        message: "unauthorized crediential",
      });
    }

  }

};