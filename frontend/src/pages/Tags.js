import React, { useState, useEffect, useContext } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'


const Tags = ({ tag, onClick }) => {

  const { questions } = useContext(QuestionsContext)
  // State to store the fetched cards data
  const [cards, setCards] = useState([]);

  const [selectedTag, setSelectedTag] = useState(null);

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Fetch cards from the Rails backend when the component mounts
    fetch('/api/cards')
      .then(response => response.json()) // Parse the JSON data from the response
      .then(data => setCards(data)) // Update the 'cards' state with the fetched data
      .catch(error => console.error('Error fetching cards:', error)); // Handle fetch errors
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };



  return (
    <>
      {/* Intro to Tags section */}
      <div className='gap-4 mx-20 py-10'>
        <h2 className="text-4xl font-extrabold dark:text-white">Tags</h2>
        <p className="my-4 text-lg text-gray-500">A tag is a keyword or label that categorizes your question with other, similar questions.</p>
        <a href="#" className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline">
          Show all tags
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>


      {/* Cards section to be fetched from the backend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-20 py-10">
        {/* Conditional rendering based on the state of 'cards' */}
        {cards.length > 0 ? (
          // Render cards when 'cards' state is populated
          cards
            .filter((card) => !selectedTag || card.tags.includes(selectedTag.name))
            .map((card, index) => (
              <div className="mb-10" key={index}>
                {/* Each card is represented by an anchor element */}
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  {card.title} {/* Display the card's title */}
                </a>
                {/* Display the card's description */}
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            ))
        ) : (
          // Render a loading state or placeholder when 'cards' state is empty
          <p>Loading...</p>
        )}
      </div>



      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mx-20 py-10">

        {/* Javascript Tag */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Javascript
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              For questions about programming in ECMAScript (JavaScript/JS) and its different
              dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java.
              Include all tags that are relevant to your question: e.g., [node.js], [jQuery], [JSON],
              [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc.Go to this step
              by step guideline process on how to certify for your weekly benefits:
            </p>
          </p>
        </div>

        {/* Python Tag */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Python
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, NumPy), please include it in the tags.
            </p>
          </p>
        </div>

        {/* Node.Js */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            node.js
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. It is used for developing applications that make heavy use of the ability to run JavaScript both on the client as well as on the server side and therefore benefit from the re-usability of code and the lack of context switching.
            </p>
          </p>
        </div>

        {/* Java */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Java
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.
            </p>
          </p>
        </div>

        {/* Ruby on Rails */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Ruby on Rails
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">

              Ruby is a multi-platform open-source, dynamic object-oriented interpreted language. The [ruby] tag is for questions related to the Ruby language, including its syntax and its libraries. Ruby on Rails questions should be tagged with [ruby-on-rails].
            </p>
          </p>
        </div>

        {/* React */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            React
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.
            </p>
          </p>
        </div>

        {/* PHP */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            PHP
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              PHP is an open source, multi-paradigm, dynamically-typed and interpreted scripting language designed initially for server-side web
            </p>
          </p>
        </div>

        {/* CSS */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            CSS
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML
            </p>
          </p>
        </div>

        {/* HTML */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            HTML
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.
            </p>
          </p>
        </div>

        {/* C++ */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            C++
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              C++ is a general-purpose programming language. Initially, it was designed as an extension to C and has a similar syntax, but it is now a completely
            </p>
          </p>
        </div>

        {/* Android */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Android
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Android is Google's mobile operating system, used for programming or developing digital devices
            </p>
          </p>
        </div>

        {/* SQL */}
        <div className='mb-10'>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            SQL
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Structured Query Language (SQL) is a language for querying databases. Questions should include code examples, table structure, sample data
            </p>
          </p>
        </div>
      </div>
    </>

  )
}

export default Tags