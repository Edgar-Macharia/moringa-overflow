import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { currentUserData, fetchCurrentUser, editUserProfile, resetPassword } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(currentUserData.username || "Your Username");
  const [email, setEmail] = useState(currentUserData.email || "your.email@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving the updated profile data here (e.g., make API calls to update the profile data)
    editUserProfile({ username, email });
    setIsEditMode(false);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., make API calls to reset the password)
    resetPassword(currentUserData.id, { password, confirmPassword });
    setResetSuccess(true);
  };

  const handleResetPasswordClick = () => {
    setResetMode(true);
    setResetSuccess(false); // Reset the resetSuccess state to hide the success message
  };

  return (
    <div className=''>
      <div className="container mx-auto p-6 m-16 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          {/* Profile Picture */}
          <img className="w-32 h-32 mx-auto mt-6 rounded-full" src={"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"} alt="Avatar" />
          {/* Username */}
          {isEditMode ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 text-xl font-semibold text-center mt-4 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
            />
          ) : (
            <h1 className="text-3xl font-semibold text-center mt-4">{currentUserData.username}</h1>
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
            <p className="text-gray-600 text-center mt-2">{currentUserData.email}</p>
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
            <p className="text-gray-500">Joined at: {currentUserData.created_at}</p>
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
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
                  </div>
                </form>
              </div>
            )
          ) : (
            <div className="flex justify-center mt-4">
              <button onClick={handleResetPasswordClick} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Change Password</button>
            </div>
          )}
          {currentUserData.questions.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Questions Asked by You</h2>
              <ul className="mt-4 space-y-2">
                {currentUserData.questions.map((question, index) => (
                  <li key={index}>
                    <a href="#" className="text-blue-500 hover:underline">
                      {question.title} {/* Assuming title is the property for the question */}
                    </a>
                    <p className="text-gray-500">Posted on: {question.postedDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No questions asked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
