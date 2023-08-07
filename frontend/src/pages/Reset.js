import React, { useState } from 'react';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Send a POST request to your backend API with the user's email
    fetch('/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        if (data.error) {
          setError(data.error);
        } else {
          setRecoverySent(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="mx-auto p-24">
      <div className="container max-w-sm mx-auto rounded-lg shadow-md">
        <p className="text-center mt-6">
          Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handlePasswordReset}>
          <div className="flex justify-center px-10 p-4 px-8 mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
              required
            />
          </div>
          <div className="flex justify-center px-10 p-10 px-8 mt-4">
            <button
              type="submit"
              className="w-60 p-10 text-white hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]"
            >
              Send Recovery email
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 flex justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {recoverySent && (
          <div className="mt-4 flex justify-center">
            <p className="text-green-500">Recovery link sent to your email!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reset;
