import React from "react";

import { Link } from "react-router-dom";

import Logo from "../../assets/reddit-logo.png";

import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={Logo} alt="Logo" width="40" />
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
    </nav>
  );
};

export default NavBar;
