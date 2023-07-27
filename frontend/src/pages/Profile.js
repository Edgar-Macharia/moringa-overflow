import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("Your Username"); // Replace with the user's actual username
  const [email, setEmail] = useState("your.email@example.com"); // Replace with the user's actual email

  // Password Reset State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving the updated profile data here (e.g., make API calls to update the profile data)
    setIsEditMode(false);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., make API calls to reset the password)
    // After successful password reset, you can set resetSuccess to true to display a success message
    setResetSuccess(true);
  };

  const handleResetPasswordClick = () => {
    setResetMode(true);
    setResetSuccess(false); // Reset the resetSuccess state to hide the success message
  };

  return (
    <div className=''>
      <div className="container mx-auto p-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          {/* Profile Picture */}
          <img className="w-32 h-32 mx-auto mt-6 rounded-full"src={"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"}alt="Profile Picture" />
          {/* Username */}
          {isEditMode ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 text-xl font-semibold text-center mt-4 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
            />
          ) : (
            <h1 className="text-3xl font-semibold text-center mt-4">{username}</h1>
          )}
          {/* Email */}
          {isEditMode ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 text-gray-600 text-center mt-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
            />
          ) : (
            <p className="text-gray-600 text-center mt-2">{email}</p>
          )}
          {/* Update Profile Button */}
          {isEditMode ? (
            <div className="flex justify-center mt-4">
              <button onClick={handleSaveClick} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save Profile</button>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button onClick={handleEditClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Profile</button>
            </div>
          )}
          {/* Joined At */}
          <div className="flex justify-center mt-4">
            <p className="text-gray-500">Joined at: 01 January 2022</p>
          </div>
          {/* Change Password */}
          {resetMode ? (
            // Password Reset Form
            resetSuccess ? (
              <div className="mt-4 flex justify-center">
                <p className="text-green-500">Password Reset Successful!</p>
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Password Reset</h2>
                <form className="mt-4 space-y-4" onSubmit={handlePasswordReset}>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button type="submit"  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
                  </div>
                </form>
              </div>
            )
          ) : (
            <div className="flex justify-center mt-4">
              <button onClick={handleResetPasswordClick} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Change Password</button>
            </div>
          )}
          {/* Questions Asked */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Questions Asked by You</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-blue-500 hover:underline">Question Title 1</a>
                <p className="text-gray-500">Posted on: 01 January 2023</p>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">Question Title 2</a>
                <p className="text-gray-500">Posted on: 15 February 2023</p>
              </li>
              {/* Add more questions here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
