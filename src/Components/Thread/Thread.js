import React, { useState, useEffect, useRef } from "react";

import Comment from "../Comment/Comment";

import { useParams } from "react-router-dom";
import app from "../../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import ArrowUp from "../../assets/chevron-up-solid.svg";
import ArrowDown from "../../assets/chevron-down-solid.svg";

import styles from "./Thread.module.css";

const db = getFirestore(app);
const auth = getAuth(app);

const Thread = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [totalUpvotes, setTotalUpvotes] = useState(0);

  const { currentUser } = auth;

  const commentRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "posts"), where("id", "==", id));

    getDocs(q).then((data) => {
      data.forEach((item) => {
        setPost(item.data());
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(post).length > 0) {
      setTotalUpvotes(post.upvotedUsers.length - post.downvotedUsers.length);
      if (
        hasUpvoted &&
        !post.upvotedUsers.includes(`u/${currentUser.email.split("@")[0]}`)
      ) {
        console.log("Upvoted with no user");
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
        console.log("Downvoted with no user");
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

  function postComment(e) {
    e.preventDefault();

    if (!commentRef.current.value) {
      return;
    }

    updateDoc(doc(db, "posts", post.id), {
      comments: arrayUnion({
        user: `u/${currentUser.email.split("@")[0]}`,
        text: commentRef.current.value,
      }),
    }).then(() => {
      console.log("Comment posted!");
    });
  }

  return (
    <div className={styles.thread}>
      <div className={styles.post} id={post.id}>
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
          {post.image ? (
            <img src={post.image} className={styles.image} />
          ) : null}
          <p className={styles.content}>{post.content}</p>
          <form className={styles.form} onSubmit={postComment}>
            <p className={styles.user}>
              Comment as <span className={styles.span}>r/username</span>
            </p>
            <textarea
              rows="4"
              className={styles.textarea}
              placeholder="What are your thoughts?"
              ref={commentRef}
              required
            />
            <button type="submit" className={styles.comment}>
              Comment
            </button>
            {post.comments
              ? post.comments.map((comment) => <Comment comment={comment} />)
              : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Thread;
