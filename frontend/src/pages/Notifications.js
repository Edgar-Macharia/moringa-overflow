import React, { useContext } from 'react';
import { QuestionsContext } from '../context/QuestionsContext';
const Notifications = () => {
const {notifications,markNotificationAsRead } = useContext(QuestionsContext)

  return (
    <div>
      <h2 className='text-4xl font-extrabold dark:text-white'>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            style={{ fontWeight: notification.read_status ? 'normal' : 'bold' }}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
