import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { QuestionsContext } from '../context/QuestionsContext';


const ViewTag = () => {
  const { tags, downvoteQuestion, upvoteQuestion, toggleFavorite, isQuestionFavorited } = useContext(QuestionsContext);
  const { id } = useParams()

const [questions, setQuestions] = useState();

useEffect(() => {
  fetch(`/tags/${id}`)
    .then((res) => res.json())
    .then((response) => {
      setQuestions(response.questions);
      console.log(response.questions)
    })
    .catch((error) => {
      console.error('Error fetching tag:', error);
    });
}, [id, tags]);

  const handleUpvote = (questionId, e) => {
    e.preventDefault();
    upvoteQuestion(questionId);
  };

  const handleDownvote = (questionId, e) => {
    e.preventDefault();
    downvoteQuestion(questionId);
  };

  return (
    <div>
      {questions && questions.length === 0 ? (
        <div>
        <h1 className='text-2xl'>tags.name</h1>
        <p>No questions found.</p>
        </div>
      ):(
        
        questions &&
        questions.map((question, index) => {
          return (
            <div>
            <div>
            {/* <h2 className='text-2xl font-extrabold dark:text-white'>tag:{tags.tag_names}</h2> */}
            </div>
            <div
              key={question.id || index}
              className="questions-page flex justify-center items-center bg-gray-100 sm:p-6 homepage"
            >
              <Link
                to={`/ViewQuestion/${question.id}`}
                className="w-70p sm:w-full bg-white shadow-xl rounded-lg p-3"
              >
                <div className="question-details p-4 bg-white rounded-lg shadow-md whitespace-normal">
                  <h3 className="question-title text-xl font-bold mb-2">{question.title}</h3>
                  <p className="question-details mb-4 ">{question.body}</p>
                  <div className="vote-buttons">
          
                      <button
                        onClick={(e) => handleUpvote(question.id, e)}
                        className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className={`w-5 h-5`}
                        />
                        <span className="ml-2"> ({question.upvotes_count} Upvotes)</span>
                      </button>
          
                      <button
                        onClick={(e) => handleDownvote(question.id, e)}
                        className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsDown}
                          className={`w-5 h-5`}
                        />
                        <span className="ml-2"> ( {question.downvotes_count} Downvotes)</span>
                      </button>
          
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(question.id);
                        }}
                        className={`text-gray-600 ${isQuestionFavorited(question.id) ? 'text-red-600' : 'hover:text-yellow-600'
                          } font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none`}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`w-5 h-5 ${isQuestionFavorited(question.id) ? 'text-red-600' : 'text-gray-600'
                            }`}
                        />
                      </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-brown-500 font-medium mb-2">
                      Answers: {question && question.answers && question.answers.length}
                    </p>
                    <p className="text-sm text-blue-500 font-medium mb-2">
                      {question && 
                        question.tag_names &&
                        question.tag_names.join(', ')}
                    </p>
                    <p className="text-sm text-brown-500 font-medium mb-2">
                      {question.author_username}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ViewTag;
