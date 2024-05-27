import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { BookRepository } from "./models/bookModel.js";

const app = express();

//IMPT!! Middleware for parsing request body
app.use(express.json());

//route for GET
app.get("/", (req, res) => {
  console.log(`helo from port ${PORT}`);
  return res.status(234).send("hi mern stack");
});

//route for POST (create)
app.post("/books", async (req, res) => {
  try {
    if (
      req.body.title == null ||
      req.body.author == null ||
      req.body.publishYear == null
    ) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await BookRepository.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//route for GET ALL (find)
app.get("/books", async (req, res) => {
  try {
    const books = await BookRepository.find({});
    return res.status(200).json(books);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
