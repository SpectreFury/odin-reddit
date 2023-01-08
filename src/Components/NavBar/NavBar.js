import React from "react";

import { Link, useNavigate } from "react-router-dom";
import app from "../../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

import Logo from "../../assets/reddit-logo.png";

import styles from "./NavBar.module.css";

const auth = getAuth(app);

const NavBar = (props) => {
  const navigate = useNavigate();

  function logout() {
    signOut(auth).then(() => {
      props.handleIsLoggedIn(null);
      navigate("/login");
    });
  }

  return (
    <nav className={styles.navbar}>
      <img src={Logo} alt="Logo" width="40" />
      {props.isLoggedIn ? (
        <a className={styles.logout} onClick={logout}>
          Log Out
        </a>
      ) : (
        <ul className={styles.links}>
          <li>
            <Link to="/" className={styles.link}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.link}>
              Log In
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
