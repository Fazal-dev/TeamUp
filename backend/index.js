import express from "express";
const app = express();
import cors from "cors";
// middleware for parsing request body
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("hello world");
});
// routes
// app.use("/books", booksRoute);

app.listen(8000, (req, res) => {
  console.log("server is running");
});
