import React from "react";

import styles from "./Comment.module.css";

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className={styles.comment}>
      <div className={styles.details}>
        <div className={styles.username}>{comment.user}</div>
        <div className={styles.time}>8 hr. ago</div>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
