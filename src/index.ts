import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
