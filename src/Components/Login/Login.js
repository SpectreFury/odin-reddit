import React, { useRef } from "react";

import { Link } from "react-router-dom";
import app from "../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import styles from "./Login.module.css";

const auth = getAuth(app);

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  function login(e) {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then((user) => {
      console.log(user);
    });
  }

  return (
    <div>
      <form className={styles.form} onSubmit={login}>
        <h1 className={styles.header}>Log In</h1>
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            ref={emailRef}
            required
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.login}>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
