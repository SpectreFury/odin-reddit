import React from "react";

import ArrowUp from "../../assets/chevron-up-solid.svg";
import ArrowDown from "../../assets/chevron-down-solid.svg";

import styles from "./Post.module.css";

const Post = (props) => {
  const { post } = props;

  return (
    <div className={styles.post}>
      <div className={styles.left}>
        <button className={styles.button}>
          <img src={ArrowUp} width="20" />
        </button>
        <div>{post.upvotes}</div>
        <button className={styles.button}>
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
