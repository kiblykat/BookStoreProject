import mongoose from "mongoose";

//this is similar to an Entity in Springboot
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

export const Book = mongoose.model("Cat", bookSchema);
