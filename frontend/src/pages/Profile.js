import React, { useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CloudinaryContext } from 'cloudinary-react';

const Profile = () => {
  const { currentUserData, editUserProfile, resetPassword, setCurrentUserData } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(currentUserData.username);
  const [email, setEmail] = useState(currentUserData.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = currentUserData.id;

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await axios.post(`/users/${userId}/update_profile_picture`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`, },
      });
      if (response.status === 200) {
      console.log(response);
      const updatedUserData = { ...currentUserData, profile_picture: response.data.profile_picture_url };
      setCurrentUserData(updatedUserData);
      console.log(updatedUserData);
      setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }

  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    const updatedUserData = {};
    
    if (username !== currentUserData.username) {
      updatedUserData.username = username;
    }
  
    if (email !== currentUserData.email) {
      updatedUserData.email = email;
    }
  
    if (password) {
      updatedUserData.password = password;
    }
  
    const newUserData = {
      user: updatedUserData
    };
  
    editUserProfile(newUserData);
    setIsEditMode(false);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const passwordData = {
      password: password,
      password_confirmation: confirmPassword,
      current_password: currentPassword
    };
    console.log(passwordData);
    resetPassword(currentUserData.id, passwordData);
    setResetSuccess(true);
  };

  const handleResetPasswordClick = () => {
    setResetMode(true);
    setResetSuccess(false);
  };

  let link = ""
  function src() {
    if (currentUserData.profile_picture){
      link = currentUserData.profile_picture
    } else {
      link = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    }
  }
  src()

  return (
    <div className=''>
      <div className="container mx-auto p-6 m-16 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          {/* Profile Picture */}
          <img className="w-32 h-32 mx-auto mt-6 rounded-full" src={link} alt="Avatar" />
          {/* Username */}
          {isEditMode ? (
            <>
            <p>Update your Avatar, Email or Username below</p>
             <CloudinaryContext cloudName="dkcfnb31k">
             <div>
               <input type="file" onChange={handleImageChange} />
               <button onClick={handleImageUpload} className="space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6C3428] hover:bg-[#DFA878]">
                 Upload Image
               </button>
             </div>
           </CloudinaryContext>
            <input
              type="text"
              value={username}
              placeholder={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 text-xl font-semibold text-center mt-4 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
            />
            </>
          ) : (
            <h1 className="text-3xl font-semibold text-center mt-4">{currentUserData.username}</h1>
          )}
          {/* Email */}
          {isEditMode ? (
            <>
              <input
                type="email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-600 text-center mt-2 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
              />
              <div className="mt-6">
                <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                  required
                />
              </div>
            </>
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
            <p className="text-gray-500">Joined: {new Date(currentUserData.created_at).toLocaleDateString()}</p>
          </div>
          {/* Change Password */}
          {resetMode ? (
            // Password Reset Form
            resetSuccess ? (
              <div className="mt-4 flex justify-center">
                <p className="text-green-500">Password Change Successful!</p>
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="text-xl font-semibold"> Change Password</h2>
                <form className="mt-4 space-y-4" onSubmit={handlePasswordReset}>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>
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
          {currentUserData.questions && currentUserData.questions.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Questions Asked by You</h2>
              <ul className="mt-4 space-y-2">
                {currentUserData.questions.map((question, index) => (
                  <li key={index}>
                    <Link to={`/ViewQuestion/${question.id}`} className="text-blue-500 hover:underline">
                      {question.title}
                    </Link>
                    <p className="text-gray-500">Posted on: {new Date(question.created_at).toLocaleDateString()}</p>
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
