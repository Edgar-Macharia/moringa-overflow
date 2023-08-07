import React, { useState } from 'react';

const usersData = [
  { id: 1, name: 'User 1', isModerator: false },
  { id: 2, name: 'User 2', isModerator: true },
  { id: 3, name: 'User 3', isModerator: false },
  // Add more user data here...
];

const Admin = () => {
  const [users, setUsers] = useState(usersData);

  const handleMakeModerator = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isModerator: true } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Page</h1>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">User List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Moderator</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {user.isModerator ? 'Yes' : 'No'}
                </td>
                <td className="border px-4 py-2">
                  {!user.isModerator && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleMakeModerator(user.id)}
                    >
                      Make Moderator
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
