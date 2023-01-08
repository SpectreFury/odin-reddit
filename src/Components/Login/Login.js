import React, { useRef, useEffect } from "react";

import { Link, Navigate } from "react-router-dom";
import app from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styles from "./Login.module.css";

const auth = getAuth(app);

const Login = (props) => {
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

  return props.isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
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
