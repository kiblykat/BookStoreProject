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

//route for POST
app.post("/books", async (req, res) => {
  //error checking
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title,author.publishYear",
      });
    }

    //create new object newBook based from user input, to be pushed into db
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    //adds the POST request as a new book in db, await for synchronous running
    const book = await BookRepository.create(newBook);

    //return status OK and send book res
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
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
