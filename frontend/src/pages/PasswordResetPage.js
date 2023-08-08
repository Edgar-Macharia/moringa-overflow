import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PasswordResetPage = () => {
  const { id } = useParams();
  console.log(id)
  const [passwords, setPasswords] = useState({
    password: '',
    password_confirmation: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true); // Initially assume the token is valid

  useEffect(() => {
    // You can implement an API call here to check if the reset token is valid
    // For simplicity, we are not doing that in this example.
    // Instead, we will assume the token is valid for demonstration purposes.
    setIsTokenValid(true);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, password_confirmation } = passwords;

    // Make a POST request to the backend API to reset the password
    fetch(`/PasswordResetPage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, password_confirmation })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to reset password. Please try again later.');
        }
      })
      .then((data) => {
        setSuccessMessage(data.message);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage('');
      });
  };

  const { password, password_confirmation } = passwords;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 homepage">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            {isTokenValid ? (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    value={password_confirmation}
                    name="password_confirmation"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Reset Password
                </button>
                {successMessage && (
                  <div className='text-sm font-light text-green-500'>
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className='text-sm font-light text-red-500'>
                    {errorMessage}
                  </div>
                )}
              </form>
            ) : (
              <div className='text-sm font-light text-red-500'>
                Password reset link is invalid or has expired.
              </div>
            )}
            <div className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Back to <Link className='font-medium text-primary-600 hover:underline dark:text-primary-500' to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;
