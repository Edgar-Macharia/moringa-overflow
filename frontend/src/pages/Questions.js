import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const Questions = () => {
  const [question, setQuestion] = useState({
    title: 'Sample Question Title',
    details: 'Sample question details go here...',
    upvotes: 10,
    downvotes: 3,
  });

  const [answers, setAnswers] = useState([
    {
      id: 1,
      author: 'User1',
      content: 'This is the first answer to the question.',
      upvotes: 5,
      downvotes: 1,
    },
    {
      id: 2,
      author: 'User2',
      content: 'Another user provided this answer.',
      upvotes: 7,
      downvotes: 2,
    },
  ]);

  const [userVote, setUserVote] = useState({
    question: false,
    answers: {},
  });

  const handleQuestionUpvote = () => {
    if (!userVote.question) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        upvotes: prevQuestion.upvotes + 1,
      }));
      setUserVote((prevUserVote) => ({ ...prevUserVote, question: true }));
    }
  };

  const handleQuestionDownvote = () => {
    if (!userVote.question) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        downvotes: prevQuestion.downvotes + 1,
      }));
      setUserVote((prevUserVote) => ({ ...prevUserVote, question: true }));
    }
  };

  const handleAnswerUpvote = (answerId) => {
    if (!userVote.answers[answerId]) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId ? { ...answer, upvotes: answer.upvotes + 1 } : answer
        )
      );
      setUserVote((prevUserVote) => ({
        ...prevUserVote,
        answers: { ...prevUserVote.answers, [answerId]: true },
      }));
    }
  };

  const handleAnswerDownvote = (answerId) => {
    if (!userVote.answers[answerId]) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId ? { ...answer, downvotes: answer.downvotes + 1 } : answer
        )
      );
      setUserVote((prevUserVote) => ({
        ...prevUserVote,
        answers: { ...prevUserVote.answers, [answerId]: true },
      }));
    }
  };

  return (
    <div className="questions-page fc-black-800 h-screen flex justify-center items-center bg-gray-100 w-128 mx-11">
      <div className="w-full h-auto bg-white shadow-xl rounded-lg p-8">
        {/* Increase the card size by adding 'w-128' and other styles */}
        <div className="flex justify-end mx-11 ">
          <div className="questions-btn">
            <Link to="/AskQuestion">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Ask A Question
              </button>
            </Link>
          </div>
        </div>
        <div className="question-details p-4 bg-white rounded-lg shadow-md">
          <h3 className="question-title text-xl font-bold mb-2">Title goes here</h3>
          <p className="question-details mb-4">Question details go here</p>
          <div className="vote-buttons">
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                userVote.question ? 'pointer-events-none opacity-50' : ''
              }`}
              onClick={handleQuestionUpvote}
              disabled={userVote.question}
            >
              <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5" />
              <span className="ml-2"> (Upvotes)</span>
            </button>
            <button
              className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 ${
                userVote.question ? 'pointer-events-none opacity-50' : ''
              }`}
              onClick={handleQuestionDownvote}
              disabled={userVote.question}
            >
              <FontAwesomeIcon icon={faThumbsDown} className="w-5 h-5" />
              <span className="ml-2"> (Downvotes)</span>
            </button>
          </div>
        </div>
  
        <div className="answers mt-4">
          <h4 className="text-lg font-bold">Answers:</h4>
          {answers.map((answer) => (
            <div key={answer.id} className="answer p-4 bg-white rounded-lg shadow-md mt-4">
              <p>{answer.content}</p>
              <div className="answer-meta mt-2">
                <span>By {answer.author}</span>
                <div className="vote-buttons mt-2">
                  <button
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                      userVote.answers[answer.id] ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={() => handleAnswerUpvote(answer.id)}
                    disabled={userVote.answers[answer.id]}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5" />
                    <span className="ml-2">({answer.upvotes})</span>
                  </button>
                  <button
                    className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 ${
                      userVote.answers[answer.id] ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={() => handleAnswerDownvote(answer.id)}
                    disabled={userVote.answers[answer.id]}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} className="w-5 h-5" />
                    <span className="ml-2"> ({answer.downvotes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default Questions;