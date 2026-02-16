import express, { Application, Request, Response } from "express";

import { indexRoutes } from "./app/routes";

const app: Application = express();
const PORT = 5000;

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

app.use("/api/v1/", indexRoutes);

// Basic route

app.get("/", async (req: Request, res: Response) => {
  res.send(`Healthcare Management is running or the Port: ${PORT}`);
});

export default app;
