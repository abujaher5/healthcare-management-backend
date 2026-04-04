import { Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createDoctor = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userService.createDoctor(payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor registered successfully.",
    data: result,
  });
};

export const userController = {
  createDoctor,
};
