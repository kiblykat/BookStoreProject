import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { BookRepository } from "./models/bookModel.js";

//Setting up middleware (express running on
//node, to access backend-i.e mongodb)
const app = express();
//IMPT!! Middleware for parsing request body
app.use(express.json());

//route for POST (create)
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
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
    return res.status(200).json({
      count: books.length,
      data: books,
    }); //GET ALL uses .json instead of .send()
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//route for GET ONE (findById)
app.get("/books/:id", async (req, res) => {
  try {
    //Need to DESTRUCTURE first
    const { id } = req.params;

    const book = await BookRepository.findById(id);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message,inSimpleWords: "id is not available haha" });
  }
});

//route for PUT (findByIdAndUpdate)
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields:title, author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await BookRepository.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ message: "Book successfully updated", data: book });
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
