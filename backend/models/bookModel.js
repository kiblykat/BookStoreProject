import mongoose from "mongoose";

//Schema === Entity in Springboot
//id will be auto handled by database
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
//Model === Repository in Springboot
//Provides built in Repository functions (find/create...)
export const BookRepository = mongoose.model("Book", bookSchema);
