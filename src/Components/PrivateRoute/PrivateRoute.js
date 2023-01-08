import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  if (props.isLoggedIn === undefined) return;

  return props.isLoggedIn ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;
