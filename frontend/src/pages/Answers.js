import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuestionsContext } from '../context/QuestionsContext';

const AskQuestion = () => {
  const { createAnswer } = useContext(QuestionsContext);
  const [body, setBody] = useState('');
  const [question_id, setQuestionId] = useState('');

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id= sessionStorage.getItem("userId");
    const answer = {
       body,
       user_id,
       question_id
    };
    console.log(answer);
    createAnswer(answer); // Assuming "createQuestion" handles the question creation logic
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8 max-w-screen-lg flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-4">Answer</h1>
        <form className="flex-grow max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4 flex-grow">
            <label htmlFor="body" className="block text-lg font-semibold mb-2">
              Body
            </label>
            <ReactQuill
              value={body}
              onChange={handleBodyChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'list',
                'bullet',
                'link',
                'image',
              ]}
              placeholder="Enter the details of your question"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
