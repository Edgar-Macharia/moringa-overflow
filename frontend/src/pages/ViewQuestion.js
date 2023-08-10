import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionsContext } from "../context/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const ViewQuestion = () => {
  const nav = useNavigate();
  const {
    tags,
    deleteQuestion,
    downvoteQuestion,
    upvoteQuestion,
    upvoteAnswer,
    downvoteAnswer,
    toggleFavorite,
    isQuestionFavorited,
    questions,
  } = useContext(QuestionsContext);
  const { isLoggedIn, currentUserData } = useContext(AuthContext);
  const { id } = useParams();

  const [question, setQuestion] = useState();
  const [title, setTitle] = useState(question?.title);
  const [body, setBody] = useState(question?.body);
  const [editTitle, setEditTitle] = useState(false);
  const [editBody, setEditBody] = useState(false);
  const [userVote, setUserVote] = useState({
    question: false,
    answers: {},
  });


    // Update a question
    const updateQuestion = (questionId, updatedQuestionData) => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "Not authorized to update question", "error");
        return;
      }
  
      fetch(`/questions/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: updatedQuestionData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            Swal.fire("Error", data.errors, "error");
          } else {
            console.log(data);
            setQuestion(data);
            Swal.fire("Success", "Question updated successfully", "success");
            nav(`/viewquestion/${questionId}`);
          }
        })
        .catch((error) => {
          console.error("Error updating question:", error);
          Swal.fire("Error", "Failed to update question", "error");
        });
    };

  useEffect(() => {
    fetch(`/questions/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setQuestion(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [id, questions]);

  const handleUpvote = (questionId, e) => {
    e.preventDefault();
    upvoteQuestion(questionId);
  };

  const handleDownvote = (questionId, e) => {
    e.preventDefault();
    downvoteQuestion(questionId);
  };

  const handleDeleteQuestion = (questionId) => {
    // Implement your deleteQuestion function here or call it from your context.
    deleteQuestion(questionId);
  };

  const handleEditTitleClick = () => {
    if (question.author_username === currentUserData.username) {
      setEditTitle(true);
    }
  };
  
  const handleEditBodyClick = () => {
    if (question.author_username === currentUserData.username) {
      setEditBody(true);
    }
  };  

  const handleUpdateQuestion = (questionId) => {
    const updatedQuestion = {};
    if (title !== question.title) {
      updatedQuestion.title = title;
    }

    if (body !== question.body) {
      updatedQuestion.body = body;
    }

    updateQuestion(questionId, updatedQuestion);
  };

  const handleAnswerUpvote = (answerId) => {
    upvoteAnswer(answerId);
  };

  const handleAnswerDownvote = (answerId) => {
    downvoteAnswer(answerId);
  };

  return (
    <>
      <div className="flex justify-end mx-11 homepage"></div>
      {question ? (
        <div
          className="questions-page flex justify-center items-center bg-gray-100 sm:p-6 homepage"
          key={question.id}
        >
          <div className="w-70p sm:w-full bg-white shadow-xl rounded-lg p-3 homepage">
            <div className="flex items-center justify-between mb-2">
              <div>
                <Link to={`/ReportContent/${id}`}>
                  <button className="report-button">Report</button>
                </Link>
              </div>

              <div>
                <Link to={`/Answers/${question.id}`}>
                  <button className="space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]">
                    Answer Question
                  </button>
                </Link>

                {/* Buttons for Delete and Update */}
                {question &&
                  question.author_username === currentUserData.username && (
                    <div className="flex justify-end mt-4">
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="w-5 h-5 mr-2"
                        />
                        Delete
                      </button>
                      <button
                        className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={() => {
                          handleUpdateQuestion(question.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="w-5 h-5 mr-2"
                        />
                        Update
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <div className="question-details p-4 bg-white rounded-lg shadow-md whitespace-normal">
              {editTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setEditTitle(false)}
                  className="question-title-input"
                />
              ) : (
                <h3
                  className="question-title text-xl font-bold mb-2"
                  onClick={handleEditTitleClick}
                >
                  {question.title}
                </h3>
              )}
              <br />
              <br />
              <hr />
              {editBody ? (
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  onBlur={() => setEditBody(false)}
                  className="question-body-textarea"
                />
              ) : (
                <p
                  className="question-details mb-4"
                  onClick={handleEditBodyClick}
                >
                  {question.body}
                </p>
              )}
              <div className="vote-buttons">
                {isLoggedIn && (
                  <button
                    onClick={(e) => handleUpvote(question.id, e)}
                    className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className={`w-5 h-5`} />
                    <span className="ml-2">
                      {question.upvotes_count} Upvotes
                    </span>
                  </button>
                )}
                {isLoggedIn && (
                  <button
                    onClick={(e) => handleDownvote(question.id, e)}
                    className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={`w-5 h-5`}
                    />
                    <span className="ml-2">
                      {" "}
                      {question.downvotes_count} Downvotes
                    </span>
                  </button>
                )}
                {isLoggedIn && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(question.id);
                    }}
                    className={`text-gray-600 ${isQuestionFavorited(question.id)
                        ? "text-red-600"
                        : "hover:text-yellow-600"
                      } font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`w-5 h-5 ${isQuestionFavorited(question.id)
                          ? "text-red-600"
                          : "text-gray-600"
                        }`}
                    />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-brown-500 font-medium mb-2">
                  Answers:{" "}
                  {question && question.answers && question.answers.length}
                </p>
                <p className="text-sm text-blue-500 font-medium mb-2">
                  {question && question.tag_names && (
                    JSON.parse(question.tag_names).map((tagName, index) => {
                      const foundTag = tags.find((tag) => tag.name === tagName);

                      return foundTag ? (
                        <Link
                          key={index}
                          to={`/viewTag/${foundTag.id}`}
                          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                        >
                          {tagName}
                        </Link>
                      ) : (
                        <span
                          key={index}
                          className="text-red-500 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Tag Not Found: {tagName}
                        </span>
                      );
                    })
                  )}
                </p>
                <p className="text-sm text-brown-500 font-medium mb-2">
                  {question.author_username}
                </p>
              </div>
            </div>

            <div className="answers mt-4">
              <h4 className="text-lg font-bold">Answers:</h4>
              {question.answers &&
                question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="answer p-4 bg-white rounded-lg shadow-md mt-4"
                  >
                    <p>{answer.body}</p>{" "}
                    {/* Use answer.body to render the answer body */}
                    <div className="answer-meta mt-2">
                      <span>By {answer.author}</span>
                      <div className="vote-buttons mt-2">
                        <button
                          className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.answers[answer.id]
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          onClick={() => handleAnswerUpvote(answer.id)}
                        >
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className={`w-5 h-5 ${userVote.answers[answer.id] ? "text-blue-600" : ""
                              }`}
                          />
                          <span className="ml-2"> {answer.upvotes_count}</span>{" "}
                          {/* Use answer.upvotes */}
                        </button>
                        <button
                          className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.answers[answer.id]
                              ? "pointer-events-none opacity-50"
                              : ""
                            }`}
                          onClick={() => handleAnswerDownvote(answer.id)}
                        >
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            className={`w-5 h-5 ${userVote.answers[answer.id] ? "text-red-600" : ""
                              }`}
                          />
                          <span className="ml-2">
                            {" "}
                            {answer.downvotes_count}
                          </span>{" "}
                          {/* Use answer.downvotes */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="ml-10">Couldn't find Question...</p>
      )}
    </>
  );
};

export default ViewQuestion;
