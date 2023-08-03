import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { QuestionsContext } from '../context/QuestionsContext';

const ViewQuestion = () => {
  const { fetchSingleQuestion, deleteQuestion } = useContext(QuestionsContext)
  const { id } = useParams();

  const [question, setQuestion] = useState();
  const [userVote, setUserVote] = useState({
    question: false,
    answers: {},
  });

  useEffect(() => {
    fetch(`/questions/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setQuestion(response);
        console.log(response)
      })
      .catch((error) => {
        console.error('Error fetching question:', error);
      });
  }, [id]);

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
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: prevQuestion.answers.map((answer) =>
          answer.id === answerId ? { ...answer, upvotes: answer.upvotes + 1 } : answer
        ),
      }));
      setUserVote((prevUserVote) => ({
        ...prevUserVote,
        answers: { ...prevUserVote.answers, [answerId]: true },
      }));
    }
  };

  const handleAnswerDownvote = (answerId) => {
    if (!userVote.answers[answerId]) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: prevQuestion.answers.map((answer) =>
          answer.id === answerId ? { ...answer, downvotes: answer.downvotes + 1 } : answer
        ),
      }));
      setUserVote((prevUserVote) => ({
        ...prevUserVote,
        answers: { ...prevUserVote.answers, [answerId]: true },
      }));
    }
  };
  const handleArchiveQuestion = () => {
    // Check if the question is already archived or not
    if (question.isArchived) {
      // If archived, you want to unarchive it
      // archiveQuestion(question.id, false);
    } else {
      // If not archived, you want to archive it
      // archiveQuestion(question.id, true);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    // Implement your deleteQuestion function here or call it from your context.
    deleteQuestion(questionId);
  };


  return (
    <>
      <div className="flex justify-end mx-11 homepage">
      </div>
      {question ? (

        <div className="questions-page flex justify-center items-center bg-gray-100 sm:p-6 homepage" key={question.id}>
          <div className="w-70p sm:w-full bg-white shadow-xl rounded-lg p-3 homepage">
            <div className="flex items-center justify-between mb-2">
              <div>
                <button
                  className="text-white hover:bg-white-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-brown-600 dark:hover:bg-brown-700 focus:outline-none dark:focus:ring-brown-800"
                  onClick={handleArchiveQuestion} // Add the function to handle archiving the question
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5" />
                  </svg>
                </button>
              </div>

              <div>
                <Link to={`/Answers/${question.id}`}>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Answer Question
                  </button>
                </Link>



                {/* Buttons for Delete and Update */}
                <div className="flex justify-end mt-4">
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-5 h-5 mr-2" />
                    Delete
                  </button>
                  <button
                    className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => {
                      // Add code to prompt for question update and call handleUpdateQuestion
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mr-2" />
                    Update
                  </button>
                </div>
              </div>
            </div>




            <div className="question-details p-4 bg-white rounded-lg shadow-md">
              <h3 className="question-title text-xl font-bold mb-2">{question.title}</h3>
              <p className="question-details mb-4">{question.body}</p>
              <div className="vote-buttons">
                <button
                  className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.question ? 'pointer-events-none opacity-50' : ''
                    }`}
                  onClick={handleQuestionUpvote}
                  disabled={userVote.question}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={`w-5 h-5 ${userVote.question ? 'text-blue-600' : ''}`}
                  />
                  <span className="ml-2"> ({question.upvotes})</span>
                </button>
                <button
                  className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.question ? 'pointer-events-none opacity-50' : ''
                    }`}
                  onClick={handleQuestionDownvote}
                  disabled={userVote.question}
                >
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className={`w-5 h-5 ${userVote.question ? 'text-red-600' : ''}`}
                  />
                  <span className="ml-2"> ({question.downvotes})</span>
                </button>
              </div>
            </div>

            <div className="answers mt-4">
              <h4 className="text-lg font-bold">Answers:</h4>
              {question.answers &&
                question.answers.map((answer) => (
                  <div key={answer.id} className="answer p-4 bg-white rounded-lg shadow-md mt-4">
                    <p>{answer.body}</p> {/* Use answer.body to render the answer body */}
                    <div className="answer-meta mt-2">
                      <span>By {answer.author}</span>
                      <div className="vote-buttons mt-2">
                        <button
                          className={`text-gray-600 hover:text-blue-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.answers[answer.id] ? 'pointer-events-none opacity-50' : ''
                            }`}
                          onClick={() => handleAnswerUpvote(answer.id)}
                          disabled={userVote.answers[answer.id]}
                        >
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className={`w-5 h-5 ${userVote.answers[answer.id] ? 'text-blue-600' : ''}`}
                          />
                          <span className="ml-2"> ({answer.upvotes})</span> {/* Use answer.upvotes */}
                        </button>
                        <button
                          className={`text-gray-600 hover:text-red-600 font-medium rounded-lg text-sm px-2 py-1 mr-2 mb-2 focus:outline-none ${userVote.answers[answer.id] ? 'pointer-events-none opacity-50' : ''
                            }`}
                          onClick={() => handleAnswerDownvote(answer.id)}
                          disabled={userVote.answers[answer.id]}
                        >
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            className={`w-5 h-5 ${userVote.answers[answer.id] ? 'text-red-600' : ''}`}
                          />
                          <span className="ml-2"> ({answer.downvotes})</span> {/* Use answer.downvotes */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className='ml-10'>Couldn't find Question...</p>
      )}
    </>
  );
};

export default ViewQuestion;
