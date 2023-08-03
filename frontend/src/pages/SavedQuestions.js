import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { QuestionsContext } from '../context/QuestionsContext';

const SavedQuestions = () => {
  const { questions, fetchQuestionAnswers } = useContext(QuestionsContext);
  const { id } = useParams();

  const [answers, setAnswers] = useState([]);

  const [userVote, setUserVote] = useState({
    question: false,
    answers: {},
  });

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
    <div>
      <div className="flex justify-end mx-11 homepage">
        <Link to='/SavedQuestions' className='mr-5'>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
          </svg>
        </Link>

        <div className="questions-btn homepage">
          <Link to="/AskQuestion">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Ask A Question
            </button>
          </Link>
        </div>
      </div>
      {questions && questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        questions &&
        questions.map((question, index) => {
          // Filter the answers based on the question_id
          const filteredAnswers = answers.filter((answer) => answer.question_id === question.id);

          return (
            <div
              key={question.id || index}
              className="questions-page flex justify-center items-center bg-gray-100 sm:p-6 homepage"
            >
              <Link to={`/ViewQuestion/${question.id}`} className="w-70p sm:w-full bg-white shadow-xl rounded-lg p-3">
                <div className="question-details p-4 bg-white rounded-lg shadow-md whitespace-normal">
                  <h3 className="question-title text-xl font-bold mb-2">{question.title}</h3>
                  <p className="question-details mb-4 ">{question.body}</p>
                  <div className="vote-buttons">
                    <button
                      className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.question ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={`w-5 h-5 ${userVote.question ? 'text-blue-600' : ''}`}
                      />
                      <span className="ml-2"> (Upvotes)</span>
                    </button>
                    <button
                      className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.question ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className={`w-5 h-5 ${userVote.question ? 'text-red-600' : ''}`}
                      />
                      <span className="ml-2"> (Downvotes)</span>
                    </button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className="text-sm text-gray-500 mb-2">Answers: {filteredAnswers.length}</p>
                    <p className='text-sm text-gray-500 mb-2'>By:{question.user_id}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  )
}

export default SavedQuestions