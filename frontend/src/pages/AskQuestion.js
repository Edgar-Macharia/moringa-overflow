import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuestionsContext } from '../context/QuestionsContext';
import DOMPurify from 'dompurify';

const AskQuestion = () => {
  const { tags, fetchTags } = useContext(QuestionsContext);
  const { createQuestion } = useContext(QuestionsContext);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const removePTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const paragraphs = div.getElementsByTagName('p');
    for (let i = paragraphs.length - 1; i >= 0; i--) {
      const paragraph = paragraphs[i];
      paragraph.parentNode.insertBefore(paragraph.firstChild, paragraph);
      paragraph.parentNode.removeChild(paragraph);
    }
    return div.innerHTML;
  };

  useEffect(() => {
    fetchTags()
  }, [])
  
  const handleTitleChange = (e) => {
    const sanitizedTitle = DOMPurify.sanitize(e.target.value);
    setTitle(sanitizedTitle);
  };

  const handleTagsChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTags(selectedValues);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagInputValue = tagInput.trim();
      if (tagInputValue && !selectedTags.includes(tagInputValue)) {
        setSelectedTags([...selectedTags, tagInputValue]);
        setTagInput('');
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id = sessionStorage.getItem('userId');
    const question = {
      title,
      body: removePTags(body), 
      tag_names: selectedTags,
      user_id,
      
    };
    console.log('Question Data:', question);
    createQuestion(question);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center homepage">
      <div className="container flex justify-center items-center bg-gray-100 sm:p-6 mx-auto py-8 max-w-screen-lg flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>
        <form className="flex-grow max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your question title"
              value={title}
              onChange={handleTitleChange}
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
              bounds={['self', 'br']}
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
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
            />
            {tags.length > 0 && (
              <div className="mt-2">
                Selected Tags:{' '}
                {selectedTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-white bg-blue-600 ml-2 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Add tags by typing and pressing Enter or comma.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]"
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
