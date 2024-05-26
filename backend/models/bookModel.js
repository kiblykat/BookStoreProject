import mongoose from "mongoose";

//this is similar to entity in Springboot
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
      rqeuired: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Cat", bookSchema);
