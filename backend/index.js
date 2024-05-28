import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

//Setting up middleware (express running on
//node, to access backend-i.e mongodb)
const app = express();
//IMPT!! Middleware for parsing request body
app.use(express.json());

//any request to the /books endpoint will be router to booksRoute.js
app.use("/books", booksRoute);

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
