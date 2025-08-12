import { Request, Response } from "express";
import app from "../app";

export default function handler(req: Request, res: Response) {
  if (req.url === "/" || req.url === "") {
    return res.status(404).send("Not Found");
  }
  return app(req, res);
}
