import React, { useState, useEffect } from "react";

import ArrowUp from "../../assets/chevron-up-solid.svg";
import ArrowDown from "../../assets/chevron-down-solid.svg";

import app from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import styles from "./Post.module.css";

const auth = getAuth(app);
const db = getFirestore(app);

const Post = (props) => {
  const [post, setPost] = useState(props.post);

  const { currentUser } = auth;

  const navigate = useNavigate();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [totalUpvotes, setTotalUpvotes] = useState(
    post.upvotedUsers.length - post.downvotedUsers.length
  );

  useEffect(() => {
    if (Object.keys(post).length > 0) {
      setTotalUpvotes(post.upvotedUsers.length - post.downvotedUsers.length);
      if (
        hasUpvoted &&
        !post.upvotedUsers.includes(`u/${currentUser.email.split("@")[0]}`)
      ) {
        updateDoc(doc(db, "posts", post.id), {
          upvotedUsers: arrayUnion(`u/${currentUser.email.split("@")[0]}`),
          downvotedUsers: arrayRemove(`u/${currentUser.email.split("@")[0]}`),
        }).then(() => {
          setTotalUpvotes(
            post.upvotedUsers.length - post.downvotedUsers.length
          );
        });
      } else if (
        hasDownvoted &&
        !post.downvotedUsers.includes(`u/${currentUser.email.split("@")[0]}`)
      ) {
        updateDoc(doc(db, "posts", post.id), {
          downvotedUsers: arrayUnion(`u/${currentUser.email.split("@")[0]}`),
          upvotedUsers: arrayRemove(`u/${currentUser.email.split("@")[0]}`),
        }).then(() => {
          setTotalUpvotes(
            post.upvotedUsers.length - post.downvotedUsers.length
          );
        });
      } else if (
        hasUpvoted &&
        post.upvotedUsers.includes(`u/${currentUser.email.split("@")[0]}`)
      ) {
        console.log("Upvoted with existing user");
        updateDoc(doc(db, "posts", post.id), {
          upvotedUsers: arrayRemove(`u/${currentUser.email.split("@")[0]}`),
        }).then(() => {
          console.log("Removed exisiting user");
        });
      } else if (
        hasDownvoted &&
        post.downvotedUsers.includes(`u/${currentUser.email.split("@")[0]}`)
      ) {
        console.log("Downvoted with existing user");
        updateDoc(doc(db, "posts", post.id), {
          downvotedUsers: arrayRemove(`u/${currentUser.email.split("@")[0]}`),
        }).then(() => {
          console.log("Removed exisiting user");
        });
      }
    }
  }, [post]);

  function upvote() {
    setPost((prev) => {
      if (hasDownvoted) {
        setHasDownvoted(false);
        setHasUpvoted(true);

        return { ...prev, upvotes: prev.upvotes + 2 };
      }

      if (hasUpvoted) {
        setHasUpvoted(false);
        return { ...prev, upvotes: prev.upvotes - 1 };
      }

      setHasUpvoted(true);
      return { ...prev, upvotes: prev.upvotes + 1 };
    });
  }

  function downvote() {
    setPost((prev) => {
      if (hasUpvoted) {
        setHasUpvoted(false);
        setHasDownvoted(true);

        return { ...prev, upvotes: prev.upvotes - 2 };
      }
      if (hasDownvoted) {
        setHasDownvoted(false);
        return { ...prev, upvotes: prev.upvotes + 1 };
      }

      setHasDownvoted(true);
      return { ...prev, upvotes: prev.upvotes - 1 };
    });
  }

  return (
    <div
      className={styles.post}
      id={post.id}
      onClick={(e) => {
        if (e.target.tagName !== "IMG") {
          navigate(`/${post.id}`);
        }
      }}
    >
      <div className={styles.left}>
        <button className={styles.button} onClick={upvote}>
          <img src={ArrowUp} width="20" />
        </button>
        <div>{totalUpvotes}</div>
        <button className={styles.button} onClick={downvote}>
          <img src={ArrowDown} width="20" />
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.flex}>
          <p className={styles.subreddit}>{post.subreddit}</p>
          <p className={styles.user}>Posted by {post.user}</p>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        {post.image ? <img src={post.image} className={styles.image} /> : null}
      </div>
    </div>
  );
};

export default Post;
