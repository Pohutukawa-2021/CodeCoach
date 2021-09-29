import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import commentsByPost from "../../redux/actions/commentsByPost";
import { counter }  from "../../redux/actions/counter"
import { useHistory } from "react-router";
import { changeAnswered } from "../../redux/actions/answered";
import { CaretUpOutline } from 'react-ionicons'
import { CaretDownOutline } from 'react-ionicons'

export function QuestionPost() {
  const history = useHistory();
  const allPosts = useSelector((state) => state.posts);
  const { postId } = useParams();
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch();
  const [className, setClassName] = useState("answered-unclicked")

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
    }
    if (vote !== voteForm)
    dispatch(counter(vote))
    return () => {
    }
  }, [vote])
  
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
  function handleUpClick(e){
    setVote({
      postId: id,
      votes: Number(e.target.value) + vote.votes,
    })
    setDisable(true)
  }

  function handleDownClick(e) {
    setVote({
      postId: id,
      votes: Number(e.target.value) + vote.votes,
    })
    setDisable(true)
  }

  function handleAnswerClick(e) {
    e.preventDefault()
    const { value } = e.target
    if (className === "answered-unclicked") {
      setClassName("answered-click")
    } else {
      setClassName("answered-unclicked")
    }
      if (Number(value) === 0) {
      dispatch(changeAnswered({
        id: id,
        answered: 1,
      }))
    } else {
      dispatch(changeAnswered({
        id: id,
        answered: 0,
      }))
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
    <div className="center-col-container">
      <div className="post-details-container">
        <h1 className="center-col-title">{post.question}</h1>
        <div className="question-body">
          <div className="vote-container">
            <button disabled={disable} value={1} onClick={handleUpClick} className="vote-button">
              <CaretUpOutline
                color={'#FCD35B'} 
                height="30px"
                width="30px"
              />
            </button>          
            <p className="counter">{post.post_votes}</p>
            <button disabled={disable} value={-1} onClick={handleDownClick} className="vote-button">
                <CaretDownOutline
                  color={'#FCD35B'} 
                  height="30px"
                  width="30px"
                />
            </button>
          </div>  
          <p> {post.body}</p>
        </div>
        <div className="footer-note">
          <small>
            {" "}
            Post created: {post.post_time} ({post.post_date})
          </small>
        </div>
        <div className="comments">
          <h2>{post.comments.length} Answers</h2>

          {commentShown.map((comment) => {
            return (
              <div className="user-comment-container">
                <p className="user-comment-question-title">{post.question}</p>
                <p className="user-comment">{comment.comment}</p>
                <div className="user-comment-user-container">
                  <img src={comment.image_url} alt={comment.username}></img>
                  <p>{comment.username}</p>
                </div>
                <div className="user-comment-date">
                  <small>
                    {" "}
                    {comment.comment_date} - {comment.comment_time}
                  </small>
                </div>
              </div>
            );
          })}
          <button className="view-more-comments-button"
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
            View more comments
          </button>
        </div>

        <form className="post-answer-container">
          <div className="answer-field">
            <label htmlFor="firstName" className="answer-label">
              Your answer
            </label>
            <textarea
              className="answer-input"
              name="comment"
              value={form.comment}
              placeholder="Comment"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="post-button-answer-container">
            
          
          {currentUser.id === post.user.id ? (
              <div className="post-buttons">
                <div className="answered-button">
              <button 
              onClick={handleAnswerClick} 
                    value={post.post_answered}
                    className={className}
              >
                Answered
              </button>
                </div>
                <div className="other-buttons-container">
            <button
              type="submit"
              className="post-button-answer edit"
              onClick={handleEdit}
                    data-testid="submitButton"
                    id=""
            >
              Edit
                </button>
                <button
              type="submit"
              className="post-button-answer"
              onClick={handleClick}
                    data-testid="submitButton"
            >
              Post
            </button>
            </div>
            </div>
          ) : (
            <button
              type="submit"
              className="post-button-answer"
              onClick={handleClick}
              data-testid="submitButton"
            >
              Post
            </button>
            )}
            
          </div>
        </form>
      </div>

      {/* {setWaiting(false)} */}
    </div>
  );
}
