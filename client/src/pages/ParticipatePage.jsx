
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import HostGallery from "../HostGallery";
// import VenueLink from "../VenueLink";
// import ParticipatedDateTime from "../ParticipatedDateTime";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../ParticipatePage.css";

// export default function ParticipatePage() {
//   const { id } = useParams();
//   const [participate, setParticipate] = useState(null);
//   const [reminderMsg, setReminderMsg] = useState("");
//   const [remindAt, setRemindAt] = useState(null);
//   const [reminderList, setReminderList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         if (id) {
//           const response = await axios.get(`/participated/${id}`);
//           console.log("Participation Data:", response.data);
//           setParticipate(response.data);
//           setReminderList(response.data.reminderList || []);
//         }
//       } catch (error) {
//         setError("Error fetching participation data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const addReminder = () => {
//     axios.post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
//         .then(res => {
//             setReminderList(res.data);
//             setReminderMsg("");
//             setRemindAt(null);
//         })
//         .catch(error => {
//             setError("Error adding reminder: " + error.message);
//         });
// };
// const deleteReminder = (reminderId, event) => {
//   if (event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//   }

//   try {
//     // Delete the reminder locally
//     const updatedReminderList = reminderList.filter((reminder) => reminder._id !== reminderId);
//     setReminderList(updatedReminderList);
    
//     // Make API call to update the server data
//     axios.delete(`/deleteReminder/${reminderId}`);
//   } catch (error) {
//     console.error('Error deleting reminder:', error);
//     setError("Error deleting reminder: " + error.message);
//   }
// };


  
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="error-message">{error}</p>;
//   }

//   return (
//     <div className="my-8">
//       {participate ? (
//         <div>
//           <h1 className="text-3xl">{participate.host.title}</h1>
//           <VenueLink className="my-2 block">{participate.host.venue}</VenueLink>
//           <ParticipatedDateTime participate={participate} />
//           <p className="event-time">Event Time: {participate.eventTime}</p>
//           <div className="bg-gray-200 p-6 mb-6 my-6 rounded-2xl flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl mb-4">You've participated!</h2>
//             </div>
//             <div className="my-4 bg-primary text-white p-6 rounded-2xl">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//           <HostGallery host={participate.host} />
//         </div>
//       ) : null}

//       <div className="App">
//         <div className="homepage">
//           <div className="homepage_header">
//             <h1>Remind Me 🙋‍♂</h1>
//             <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} />
//             <div className="datetime-picker-container">
//               <DatePicker
//                 selected={remindAt}
//                 onChange={(date) => setRemindAt(date)}
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={1}
//                 timeCaption="Time"
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 className="reminder-datepicker"
//               />
//             </div>
//             <div className="button" onClick={addReminder}>
//               Add Reminder
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="homepage_body">
//       <div className="reminder-list">
//   {(reminderList || []).map((reminder) => (
//     <div className="reminder-card" key={reminder._id}>
//       <h2 className="reminder-title">{reminder.reminderMsg}</h2>
//       <p className="reminder-time">{String(new Date(reminder.remindAt))}</p>
//       <button className="delete-button" onClick={() => deleteReminder(reminder._id)}>
//         Delete Reminder
//       </button>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HostGallery from "../HostGallery";
import VenueLink from "../VenueLink";
import ParticipatedDateTime from "../ParticipatedDateTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ParticipatePage() {
  const { id } = useParams();
  const [participate, setParticipate] = useState(null);
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(null);
  const [reminderList, setReminderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await axios.get(`/participated/${id}`);
          setParticipate(response.data);
          setReminderList(response.data.reminderList || []);
        }
      } catch (error) {
        setError("Error fetching participation data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addReminder = () => {
    const now = new Date();
    if (remindAt && remindAt < now) {
      alert('Please select a correct date and time.');
      return;
    }

    axios.post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
      .then(res => {
        setReminderList(res.data);
        setReminderMsg("");
        setRemindAt(null);
      })
      .catch(error => {
        setError("Error adding reminder: " + error.message);
      });
  };

  const deleteReminder = (reminderId, event) => {
    if (event) {
      event.preventDefault(); // Prevent the default form submission behavior
    }

    try {
      const updatedReminderList = reminderList.filter((reminder) => reminder._id !== reminderId);
      setReminderList(updatedReminderList);
      axios.delete(`/deleteReminder/${reminderId}`);
    } catch (error) {
      console.error('Error deleting reminder:', error);
      setError("Error deleting reminder: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4">
      {participate ? (
        <div className="animate-fade-in">
          <h1 className="text-3xl mb-4">{participate.host.title}</h1>
          <VenueLink className="my-2 block">{participate.host.venue}</VenueLink>
          <ParticipatedDateTime participate={participate} />
          <p className="text-gray-300">Event Time: {participate.eventTime}</p>
          <div className="bg-gray-700 p-6 mb-6 mt-6 rounded-2xl flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
              <h2 className="text-2xl mb-4">You've participated!</h2>
            </div>
            <div className="my-4 bg-purple-600 text-white p-6 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <HostGallery host={participate.host} />
        </div>
      ) : null}

      <div className="max-w-xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-2xl mb-8 transition-transform transform hover:scale-105">
          <h1 className="text-2xl mb-4 text-purple-500">Remind Me 🙋‍♂</h1>
          <input
            type="text"
            placeholder="Reminder notes here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          <div className="datetime-picker-container mt-4">
            <DatePicker
              selected={remindAt}
              onChange={(date) => setRemindAt(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="reminder-datepicker bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>
          <button
            onClick={addReminder}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition-transform transform hover:scale-105"
          >
            Add Reminder
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(reminderList || []).map((reminder) => (
            <div key={reminder._id} className="bg-gray-900 p-6 rounded-2xl transition-transform transform hover:scale-105">
              <h2 className="text-xl mb-2 text-purple-500">{reminder.reminderMsg}</h2>
              <p className="text-gray-300">{String(new Date(reminder.remindAt))}</p>
              <button
                onClick={() => deleteReminder(reminder._id)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mt-2 focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
              >
                Delete Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
