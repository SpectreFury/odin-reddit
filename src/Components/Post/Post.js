import React, { useState } from "react";

import ArrowUp from "../../assets/chevron-up-solid.svg";
import ArrowDown from "../../assets/chevron-down-solid.svg";

import { useNavigate } from "react-router-dom";

import styles from "./Post.module.css";

const Post = (props) => {
  const [post, setPost] = useState(props.post);

  console.log(post);

  const navigate = useNavigate();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

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
        <div>{post.upvotes}</div>
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
