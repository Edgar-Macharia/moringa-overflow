import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const ModeratorDashboard = () => {
  const [reportedContents, setReportedContents] = useState([]);
  const {currentUserData} = useContext(AuthContext);

  function fetchReportedContent() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('/reported_contents', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReportedContents(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching reported contents:', error);
      });
  }

  useEffect(() => {
    fetchReportedContent();
  }, []);

  // Moderator can choose to ban the user who posted the reported content
  function handleBanUser(question_id) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch(`/users/${question_id}/ban`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User has been banned:', data);
        fetchReportedContent();
      })
      .catch((error) => {
        console.error('Error banning user:', error);
      });
  }

  // Moderator can choose to do nothing about the reported content
  function handleDoNothing(contentId) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
  
    const requestData = {
      moderator_id: currentUserData.id,
      action_taken: 'Do Nothing',
      action_description: 'No action taken',
      handled_at: new Date().toISOString(),
      resolved: true,
    };
  
    fetch(`/reported_contents/${contentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Reported content has been updated:', data);
        fetchReportedContent();
      })
      .catch((error) => {
        console.error('Error updating reported content:', error);
      });
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <br />
        <h1 className="text-xl font-semibold text-center">Reported Contents List</h1>
        <br />
        {reportedContents && reportedContents.length > 0 ? (
          <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
            <thead  className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 bg-blue-500">ID</th>
                <th scope="col" className="px-6 py-3">Reason</th>
                <th  scope="col" className="px-6 py-3 bg-blue-500">Moderator</th>
                <th  scope="col" className="px-6 py-3 bg-blue-500">Question</th> 
                <th  scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedContents.map((content) => (
                <tr key={content.id}>
                  <td className="border px-4 py-2">{content.id}</td>
                  <td className="border px-4 py-2">{content.reason}</td>
                  <td className="border px-4 py-2"> {currentUserData.username}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/viewQuestion/${content.question_id}`}>View Question</Link>
                  </td>
                  <td className="border px-4 py-2">
                    {!content.isModerator && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleDoNothing(content.id)}
                      >
                        Do Nothing
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                      onClick={() => handleBanUser(content.question_id)}
                    >
                       Delete Question & Ban User 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reported contents available.</p>
        )}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
