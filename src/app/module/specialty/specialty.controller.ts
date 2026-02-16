import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await specialtyService.createSpecialty(payload);
    res.status(201).json({
      success: true,
      message: "Specialty created successfully..",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create specialty..",
      error: error.message,
    });
  }
};

const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    const result = await specialtyService.getAllSpecialties();
    res.status(201).json({
      success: true,
      message: "Specialty retrieved successfully..",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get all specialty..",
      error: error.message,
    });
  }
};

const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await specialtyService.deleteSpecialty(id as string);
    res.status(201).json({
      success: true,
      message: "Specialty deleted successfully..",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete specialty..",
      error: error.message,
    });
  }
};

export const specialtyController = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
