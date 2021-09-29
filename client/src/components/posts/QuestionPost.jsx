import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import commentsByPost from "../../redux/actions/commentsByPost";
import { counter } from "../../redux/actions/counter";
import { useHistory } from "react-router";
import { changeAnswered } from "../../redux/actions/answered";

export function QuestionPost() {
  const history = useHistory();
  const allPosts = useSelector((state) => state.posts);
  const { postId } = useParams();
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  const id = Number(postId);
  // const [waiting, setWaiting] = useState(true);
  let post = {
    body: "loading",
    comments: [],
    postId: id,
    post_date: "69/69/69",
    post_tags: "",
    post_time: "",
    post_votes: 4,
    post_answered: false,
    question: "loading...",
    user: {
      name: "loading...",
      role: "loading...",
      image: "",
    },
  };

  if (allPosts.length !== 0) {
    post = allPosts.find((post) => post.postId === id);
  }
  const currentUser = useSelector((state) => state.userAccount);
  const [commentNumber, setCommentNumber] = useState(5);

  const [form, setForm] = useState({
    postId: id,
    comment: "",
  });

  const [vote, setVote] = useState({
    postId: id,
    votes: post.post_votes,
  });

  useEffect(() => {
    const voteForm = {
      postId: id,
      votes: post.post_votes,
    };
    if (vote !== voteForm) dispatch(counter(vote));
    return () => {};
  }, [vote]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(commentsByPost(form));
    setForm({
      postId: id,
      comment: "",
    });
  }
  function handleUpClick(e) {
    setVote({
      postId: id,
      votes: Number(e.target.value) + vote.votes,
    });
    setDisable(true);
  }

  function handleDownClick(e) {
    setVote({
      postId: id,
      votes: Number(e.target.value) + vote.votes,
    });
    setDisable(true);
  }

  function handleAnswerClick(e) {
    e.preventDefault();
    const { value } = e.target;
    console.log(value);
    console.log(typeof value);
    console.log(post.post_answered);
    if (value === "false") {
      dispatch(
        changeAnswered({
          id: id,
          answered: true,
        })
      );
    } else {
      dispatch(
        changeAnswered({
          id: id,
          answered: false,
        })
      );
    }
  }

  let commentShown = [];
  if (post.comments.length > commentNumber) {
    for (let i = 0; i < commentNumber; i++) {
      const lastAddedComment = post.comments[post.comments.length - i - 1];
      commentShown.push(lastAddedComment);
    }
  } else {
    for (let i = 0; i < post.comments.length; i++) {
      const lastAddedComment = post.comments[post.comments.length - i - 1];
      commentShown.push(lastAddedComment);
    }
  }
  function handleEdit(e) {
    history.push(`/app/editquestion/${post.postId}`);
  }
  return (
    <div>
      <div className="whole-post">
        <div className="question-title-body">
          <div className="vote-container">
            <button
              disabled={disable}
              value={1}
              onClick={handleUpClick}
              className="upvote"
            >
              Up Vote
            </button>
            <p className="counter">{post.post_votes}</p>
            <button
              disabled={disable}
              value={-1}
              onClick={handleDownClick}
              className="downvote"
            >
              Down Vote
            </button>
          </div>
          <h1>Question: {post.question}</h1>
          <h2> {post.body}</h2>
        </div>

        <div className="footer-note">
          <small>
            {" "}
            Post created: {post.post_time} ({post.post_date})
          </small>
        </div>
        <div className="comments">
          <h2> {post.comments.length} Answers</h2>

          {commentShown.map((comment) => {
            return (
              <div className="each-comment">
                <p>{post.question}</p>
                <img src={comment.image_url} alt={comment.username}></img>
                <p>{comment.username}</p>
                <p>{comment.comment}</p>
                <small>
                  {" "}
                  {comment.comment_date} - {comment.comment_time}
                </small>
              </div>
            );
          })}
          <button
            onClick={() => {
              const newNumber = commentNumber + 5;
              if (newNumber >= post.comments.length) {
                setCommentNumber(post.comments.length);
              } else {
                setCommentNumber(newNumber);
              }
            }}
          >
            {" "}
            view more comments
          </button>
        </div>

        <form className="column-6">
          <div className="field">
            <label htmlFor="firstName" className="form-label">
              Your answer:
            </label>
            <input
              name="comment"
              value={form.comment}
              placeholder="comment"
              onChange={handleChange}
            ></input>
          </div>

          <button
            type="submit"
            className="button-primary"
            onClick={handleClick}
            data-testid="submitButton"
          >
            Post
          </button>
          {currentUser.id === post.user.id ? (
            <>
              <button
                type="submit"
                className="button-primary"
                onClick={handleEdit}
                data-testid="submitButton"
              >
                Edit
              </button>
              <div>
                <button onClick={handleAnswerClick} value={post.post_answered}>
                  Answered
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </form>
      </div>

      {/* {setWaiting(false)} */}
    </div>
  );
}
