import { Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
// import { catchAsync } from "../../shared/catchAsync";

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

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
};
const createSuperAdmin = async (req: Request, res: Response) => {
  const result = await userService.createSuperAdmin(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Super_Admin created successfully",
    data: result,
  });
};

export const userController = {
  createDoctor,
  createAdmin,
  createSuperAdmin,
};
