import React, { useState, useEffect } from "react";

import app from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Post from "../Post/Post";

import styles from "./Dashboard.module.css";
import Logo from "../../assets/reddit-logo.png";

const db = getFirestore(app);

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "posts")).then((data) => {
      data.forEach((post) => {
        setPosts((prev) => {
          const filteredPost = prev.filter(
            (item) => item.id !== post.data().id
          );

          return [...filteredPost, post.data()];
        });
      });
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.create}>
        <img src={Logo} width="40" />
        <input
          type="text"
          className={styles.input}
          placeholder="Create Post"
          onClick={() => {
            navigate("/submit");
          }}
        />
      </div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Dashboard;
