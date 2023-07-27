import React, {useState} from 'react'

const Reset  = () => {
    const [email, setEmail] = useState('');
    const [recoverySent, setRecoverySent] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here, you can handle sending the recovery link to the user's email
      // For this example, we'll just set the recoverySent state to true to simulate success
      setRecoverySent(true);
    };
  
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md">
          <p className="text-center text-gray-600 mt-6">Forgot your account’s password? Enter your email address and we’ll send you a recovery link.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Recovery email</button>
            </div>
          </form>
          {recoverySent && (
            <div className="mt-4 flex justify-center">
              <p className="text-green-500">Recovery link sent to your email!</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  

export default Reset