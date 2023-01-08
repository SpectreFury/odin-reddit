import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import app from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import NavBar from "./Components/NavBar/NavBar";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import SubmitForm from "./Components/SubmitForm/SubmitForm";
import Thread from "./Components/Thread/Thread";

const auth = getAuth(app);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <NavBar isLoggedIn={isLoggedIn} handleIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<SignUp isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SubmitForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Thread />
            </PrivateRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
