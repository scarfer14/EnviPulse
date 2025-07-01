import express, { Request, Response } from "express";
import { supabase } from "./supabaseClient";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/test-supabase", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("temperature_logs")
      .select("*");

    if (error) {
      console.error("Supabase Error:", error.message);
      res.status(500).json({ error: error.message });  // ✅ Don't return, just call res.json
      return;
    }

    res.json({ success: true, data });  // ✅ Same here, no need to return
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
