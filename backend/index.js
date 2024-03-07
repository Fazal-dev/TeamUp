import express from "express";
import cors from "cors";
import { dbConnection } from "./db/index.js";
const app = express();

// middleware for parsing request body
app.use(express.json());
app.use(cors());

try {
  dbConnection();
  app.listen(8000, (req, res) => {
    console.log("server is running on 8000");
  });
} catch (error) {
  console.error("COULD NOT CONNECT TO DATABASE:", error.message);
}

app.get("/", function (req, res) {
  res.send("hello world");
});
// routes
// app.use("/books", booksRoute);
