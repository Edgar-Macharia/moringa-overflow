import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { updateModerator, deleteUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // console.log(currentUserData)


  const fetchUsers = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
  
    fetch('/users', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setUsers(response);
        console.log('users', response);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeModerator = (userId) => {
    updateModerator(userId); 
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId)
    // Make an API call here to delete the user on the backend
    // For now, we'll just update the state on the frontend
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };


  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Page</h1>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Users List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Moderator</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                {user.is_moderator ? 'Yes' : 'No'}
          </td>
          <td className="border px-4 py-2">
            {!user.is_moderator ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => {
                  handleMakeModerator(user.id);
                }}
              >
                Make Moderator
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => {
                  handleMakeModerator(user.id);
                }}
              >
                Unassign
              </button>
            )}

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
