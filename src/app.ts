import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";

const app: Application = express();
const PORT = 5000;

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", async (req: Request, res: Response) => {
  const specialty = await prisma.specialty.create({
    data: {
      title: "Cardiology",
    },
  });
  res.status(201).json({
    success: true,
    message: "Prisma api is working..",
    data: specialty,
  });
});

export default app;
