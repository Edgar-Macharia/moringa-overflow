import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AskQuestion = () => {
  const [body, setBody] = useState('');

  const handleBodyChange = (value) => {
    setBody(value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8 max-w-screen-lg flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>

        <form className="flex-grow max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
            Be specific and imagine you’re asking a question to another person.
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your question title"
            />
          </div>

          <div className="mb-4 flex-grow">
            <label htmlFor="body" className="block text-lg font-semibold mb-2">Body</label>
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

          <div className="mb-4">
            <label htmlFor="tags" className="block text-lg font-semibold mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter tags (e.g., javascript, react)"
            />
            <p className="text-sm text-gray-500 mt-1">Add up to 5 tags to describe what your question is about. Separate tags with commas (e.g., javascript, react).</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Ask Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
