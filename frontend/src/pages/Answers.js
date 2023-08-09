import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuestionsContext } from '../context/QuestionsContext';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const AnswerQuestion = () => {
  const { createAnswer } = useContext(QuestionsContext);
  const [body, setBody] = useState('');
  const { question_id } = useParams();

  const handleBodyChange = (value) => {
    setBody(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id = sessionStorage.getItem('userId');
    const sanitizedValue = DOMPurify.sanitize(body, { ALLOWED_TAGS: [] }); // Remove all tags
    const answer = {
       body:sanitizedValue,
       user_id,
       question_id
    };
    console.log(answer);
    createAnswer(answer);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center homepage">
      <div className="container bg-white rounded-all mx-auto py-8 max-w-screen-lg flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-4 pl-3">Answer</h1>
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
              bounds={['self', 'br']}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerQuestion;
