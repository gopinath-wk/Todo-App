import 'dotenv/config';
import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import path from "path";
import mongoose, { mongo } from "mongoose";
import authRoutes from "./routes/authRoutes.js";

const mongoURI = process.env.MONGO_URI as string;

const app = express();
app.use(express.json());


app.use(express.static(path.join(process.cwd(), "public")));


app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


if (process.env.NODE_ENV!=='test') {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(" Failed to connect to MongoDB", err);
    });
}

export { app };
export default app;
