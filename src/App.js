import React from "react";

import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
