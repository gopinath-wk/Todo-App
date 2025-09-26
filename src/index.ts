import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import path from "path";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI as string;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use("/todos", todoRoutes);

mongoose.connect(mongoURI)
.then(()=>{
  console.log("Connected to Mongodb ");
  app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
}
).catch((err)=>{
  console.error("Failed to connect to Mongodb",err);
})


