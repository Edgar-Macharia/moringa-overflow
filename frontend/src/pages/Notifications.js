// import React from 'react'

// const Notifications = () => {
//   return (
//     <div>Notifications</div>
//   )
// }

// export default Notifications
import React, { useState, useEffect} from 'react';
import axios from 'axios';



const Notifications = () => {
 const [notifications, setNotifications] = useState([]);


 useEffect(() => {
   fetchNotifications();
 }, []);


 const fetchNotifications = async () => {
   try {
     //const response = await axios.get('/api/notifications');
     const response = await axios.get('/api/notifications');

     setNotifications(response.data);
   } catch (error) {
     console.error('Error fetching notifications:', error);
   }
 };


 const markNotificationAsRead = async (id) => {
   try {
     await axios.patch(`/notifications/mark_as_read/${id}`);
     // Mark the notification as read in the state to reflect the change instantly
     setNotifications((prevNotifications) =>
       prevNotifications.map((notification) =>
         notification.id === id ? { ...notification, read_status: true } : notification
       )
     );
   } catch (error) {
     console.error('Error marking notification as read:', error);
   }
 };


 return (
   <div>
     <h2>Notifications</h2>
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
