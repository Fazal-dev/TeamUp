import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./db/index.js";
import ProjectTaskRouter from "./routes/ProjectTaskRoute.js";
import ProjectRouter from "./routes/ProjectRoute.js";
import TaskRouter from "./routes/TaskRoute.js";
import UserRouter from "./routes/UserRoute.js";
const app = express();

// middleware for parsing request body
app.use(express.json());

const corsOptions = {
  origin: "team-up-frontend.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

try {
  dbConnection();
  app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on ${process.env.PORT}`);
  });
} catch (error) {
  console.error("COULD NOT CONNECT TO DATABASE:", error.message);
}
// routes
app.use("/api/projectTask", ProjectTaskRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);

app.get("/", function (req, res) {
  res.send("hello world");
});
