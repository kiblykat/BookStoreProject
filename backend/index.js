import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

//Middleware: express running on nodejs, to access backend-i.e mongodb
const app = express();
//Middleware: for parsing request body
app.use(express.json());

//Middleware: for handling CORS policy
//Option 1: Allow All
app.use(cors({}));
//Option 2: Custom Origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [],
//   })
// );

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
