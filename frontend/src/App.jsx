import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="" element={Home} />
      <Route path="" element={CreateBook} />
      <Route path="" element={DeleteBook} />
      <Route path="" element={ShowBook} />
      <Route path="" element={EditBook} />
    </Routes>
  );
};

export default App;
