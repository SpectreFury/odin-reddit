import React, { useRef } from "react";

import { Link, Navigate } from "react-router-dom";
import app from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import styles from "./SignUp.module.css";

const auth = getAuth(app);

const SignUp = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  function signUp(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return;
    }

    createUserWithEmailAndPassword(
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
      <form className={styles.form} onSubmit={signUp}>
        <h1 className={styles.header}>Sign Up</h1>
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
            minLength="6"
            required
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="passwordConf" className={styles.label}>
            Password Confirmation
          </label>
          <input
            type="password"
            id="passwordConf"
            className={styles.input}
            ref={passwordConfirmRef}
            minLength="6"
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.login}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
