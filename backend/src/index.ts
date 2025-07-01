import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
