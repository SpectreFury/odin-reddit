import React, { useState, useRef } from "react";

import app from "../../firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "./SubmitForm.module.css";

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const SubmitForm = () => {
  const [imageUpload, setImageUpload] = useState(null);

  const subredditRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const navigate = useNavigate();

  const { currentUser } = auth;

  function getUsername(email) {
    return email.split("@")[0];
  }

  function submitPost(e) {
    e.preventDefault();

    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);

      uploadBytes(imageRef, imageUpload).then((data) => {
        const uploadRef = ref(storage, data.metadata.fullPath);

        getDownloadURL(uploadRef).then((url) => {
          addDoc(collection(db, "posts"), {
            subreddit: subredditRef.current.value,
            user: `u/${getUsername(currentUser.email)}`,
            title: titleRef.current.value,
            content: contentRef.current.value,
            upvotes: 0,
            image: url,
            comments: [],
          }).then((data) => {
            updateDoc(doc(db, "posts", data.id), {
              id: data.id,
            }).then(() => {
              navigate("/dashboard");
            });
          });
        });
      });
    } else {
      addDoc(collection(db, "posts"), {
        subreddit: subredditRef.current.value,
        user: `u/${getUsername(currentUser.email)}`,
        title: titleRef.current.value,
        content: contentRef.current.value,
        upvotes: 0,
        image: null,
        comments: [],
      }).then((data) => {
        updateDoc(doc(db, "posts", data.id), {
          id: data.id,
        }).then(() => {
          navigate("/dashboard");
        });
      });
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={submitPost}>
        <div className={styles.group}>
          <label htmlFor="subreddit" className={styles.label}>
            Subreddit
          </label>
          <input
            type="text"
            id="subreddit"
            className={styles.input}
            ref={subredditRef}
            minLength="4"
            maxLength="40"
            required
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            ref={titleRef}
            minLength="10"
            maxLength="80"
            required
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="content" className={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            className={styles.input}
            rows="4"
            ref={contentRef}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="image" className={styles.label}>
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.dashboard}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
          <button type="submit" className={styles.button}>
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
