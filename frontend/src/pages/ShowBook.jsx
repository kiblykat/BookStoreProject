import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  //the id is passed using ._id in Home component during click (using React Router's Link component)
  const { id } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col border-2 border-sky-400 rounder-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">ID</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Date Created</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Date Updated</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowBook;
