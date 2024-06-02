import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const deleteHandler = async () => {
    try {
      setLoading(true);
      console.log("book succsefully delete");
      const res = await axios.delete(`http://localhost:5555/books/${id}`);
      enqueueSnackbar("Book Deleted successfully", { variant: "success" });
      navigate("/");
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Error occurred", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  //ensure id portion is included in url ✅
  //id can be retrieved from mapped list on Home page
  //get the id to delete using useParams()
  //pass the id to delete handler
  //axios.delete within handler to delete
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are u sure you want to delete this book?</h3>

        <button
          className="bg-red-600 p-4 text-white m-8 w-full"
          onClick={deleteHandler}
        >
          Yes, Delete It!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
