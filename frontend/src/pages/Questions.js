import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="questions-page fc-black-800">
      <div className="questions-grid">
        <div className="questions-btn">
          <Link to="/AskQuestion">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ask</button>
          </Link>
        </div>
      </div>
      <div className="question-details">
        <h3 className="question-title">{question.title}</h3>
        <p className="question-details">{question.details}</p>
        <div className="vote-buttons">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleQuestionUpvote} disabled={userVote.question}>
            Upvote ({question.upvotes})
          </button>
          <button  onClick={handleQuestionDownvote} disabled={userVote.question}>
            Downvote ({question.downvotes})
          </button>
        </div>
      </div>

      <div className="answers">
        <h4>Answers:</h4>
        {answers.map((answer) => (
          <div key={answer.id} className="answer">
            <p>{answer.content}</p>
            <div className="answer-meta">
              <span>By {answer.author}</span>
              <div className="vote-buttons">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => handleAnswerUpvote(answer.id)} disabled={userVote.answers[answer.id]}>
                  Upvote ({answer.upvotes})
                </button>
                <button onClick={() => handleAnswerDownvote(answer.id)} disabled={userVote.answers[answer.id]}>
                  Downvote ({answer.downvotes})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
