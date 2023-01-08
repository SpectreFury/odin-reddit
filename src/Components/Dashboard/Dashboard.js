import React, { useState, useEffect } from "react";

import app from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import Post from "../Post/Post";

import styles from "./Dashboard.module.css";

const db = getFirestore(app);

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "posts")).then((data) => {
      data.forEach((post) => {
        setPosts((prev) => [...prev, post.data()]);
      });
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Dashboard;
