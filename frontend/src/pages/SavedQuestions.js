import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { QuestionsContext } from '../context/QuestionsContext';

const SavedQuestions = () => {
  const { questions } = useContext(QuestionsContext);

  return (
    <div>
        <p className='ml-5 text-lg'>Saved Questions</p>
      {questions && questions.length === 0 ? (
        <p>No saved questions found.</p>
      ) : (
        questions && questions.map((question) => (
          <div
            key={question.id}
            className="questions-page flex justify-center items-center bg-gray-100 sm:p-6"
          >
            <Link to={`/ViewQuestion/${question.id}`} className="w-70p sm:w-full bg-white shadow-xl rounded-lg p-3">
              <div className="question-details p-4 bg-white rounded-lg shadow-md whitespace-normal">
                <h3 className="question-title text-xl font-bold mb-2">{question.title}</h3>
                <p className="question-details mb-4 ">{question.body}</p>
                <div className="vote-buttons">
                  <button
                    className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 text-blue-600" />
                    <span className="ml-2"> (Upvotes: {question.upvotes})</span>
                  </button>
                  <button
                    className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} className="w-5 h-5 text-red-600" />
                    <span className="ml-2"> (Downvotes: {question.downvotes})</span>
                  </button>
                </div>
                <div className='flex items-center justify-between'>
                  <p className="text-sm text-gray-500 mb-2">By: {question.user_id}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedQuestions;
