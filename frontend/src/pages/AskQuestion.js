import React from 'react';

const AskQuestion = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>

        <form className="max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your question title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="block text-lg font-semibold mb-2">Body</label>
            <textarea
              id="body"
              name="body"
              rows="6"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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
            <p className="text-sm text-gray-500 mt-1">Separate tags with commas (e.g., javascript, react)</p>
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
}

export default AskQuestion;
