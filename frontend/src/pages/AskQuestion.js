import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuestionsContext } from '../context/QuestionsContext';
import DOMPurify from 'dompurify';

const AskQuestion = () => {
  const { tags, fetchTags, createQuestion, createTag, addTag } = useContext(QuestionsContext);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState("");
  const [tag_id, setTagId] = useState("");
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

    
  useEffect(()=>{
    fetchTags()
  }, [])
  
  const handleTitleChange = (e) => {
    const sanitizedTitle = DOMPurify.sanitize(e.target.value);
    setTitle(sanitizedTitle);
  };
  
const handleBodyChange = (value) => {
  const sanitizedBody = value.replace(/<[^>]+>/g, '');
  setBody(sanitizedBody);
};

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = async (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagInputValue = tagInput.trim();
      
      if (tagInputValue) {
        const existingTag = tags.find(tag => tag.name.toLowerCase() === tagInputValue.toLowerCase());

        if (existingTag) {
          setSelectedTags([...selectedTags, existingTag.id]);
        } else {
          // If tag doesn't exist, create it
          const newTag = await createTag(tagInputValue);
          if (newTag && newTag.id) {
            console.log('New Tag:', newTag);
            console.log('Selected Tags:', selectedTags);
            setSelectedTags([...selectedTags, newTag.id]);
            addTag(newTag);
          }
        }

        setTagInput('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id = sessionStorage.getItem('userId');
    const question = {
      title,
      body,
      tag_ids: selectedTags,
      tag_names: selectedTags.map(tagId => tags.find(tag => tag.id === tagId)?.name),
      user_id,
      
    };
    console.log('Question Data:', question);
    createQuestion(question);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8 max-w-screen-lg flex flex-col h-full">
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
