import { Link } from 'react-router-dom'
import '../../src/App.css'
import homepageImage from "../images/homepage.png";
import logo from '../images/Logo.png';

const Home = () => {
  return (
    <div className='homepage'>
      <div className='relative py-16 px-8 bg-brand dark:bg-inherit text-white dark:text-gray-200 min-h-[90vh] overflow-hidden'>
        <img class="h-20 w-20 rounded-full mr-3 transition-all duration-300 rounded-lg blur-sm hover:blur-none" src={logo} alt="image description" />
        <img className="h-20 w-20 rounded-full mr-3 transition-all duration-300 rounded-lg blur-sm hover:blur-none logo" src={logo} alt="image description" />

        <h1 className='my-4 text-center text-2xl sm:text-4xl font-semibold'>Solve all your questions at one place</h1>

        <h3 className='text-center text-lg sm:text-2xl text-gray-50 dark:text-gray-300'>Get best answers to your questions here at Moringa Overflow</h3>

        <div className='mx-4 lg:mx-24 mt-16 md:mt-24 mb-4 flex flex-col md:flex-row gap-8 justify-between items-center'>
          <ul className='list-disc flex flex-col gap-4 text-lg md:text-xl dark:text-gray-300'>
            <li>Ask any question whenever stuck</li>
            <li>Get the best answers to your questions</li>
            <li>Help others by answering their questions</li>
            <li>Upvote for favourite questions and answers</li>
            <li>Downvote for unfavourable questions and answers</li>
          </ul>
          <img class="h-auto max-w-lg transition-all duration-300 rounded-lg blur-sm hover:blur-none" src={homepageImage} alt="image description" />

          <div className='text-lg sm:text-xl'>

            <>
              <div className='mb-4'>Join now to get answers right at your desk</div>
              <Link to="/Signup">
                <button className='space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]'>
                  <span className='transition-[margin]'>Get started</span>
                  <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
                </button>
              </Link>

              <span className='ml-2'>or Search questions</span>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home