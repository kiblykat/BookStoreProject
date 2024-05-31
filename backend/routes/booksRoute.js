import express from "express";
import { BookRepository } from "../models/bookModel.js";

//create an instance of express router
const router = express.Router();
//NOTE: /books is handled in index.js: app.use('/router',booksRoute)

//route for POST (create)
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    //Need to DESTRUCTURE first
    const { id } = req.params;

    const book = await BookRepository.findById(id);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
      inSimpleWords: "id is not available haha",
    });
  }
});

//route for PUT (findByIdAndUpdate)
router.put("/:id", async (req, res) => {
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

//route for DELETE (findByIdAndDelete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookRepository.findByIdAndDelete(id);
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
