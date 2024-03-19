// import { useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import { Navigate } from "react-router-dom";
// import { UserContext } from "./UserContext.jsx"
// import DateTimePicker from "react-datetime-picker";

// export default function BookingWidget({ host }) {
//   const [name, setName] = useState('');
//   const [whatsappNo, setwhatsappNo] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const { user } = useContext(UserContext);
//   const [reminderMsg, setReminderMsg] = useState("");
//   const [remindAt, setRemindAt] = useState(new Date()); // Initialize with a default date
//   const [reminderList, setReminderList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/getAllReminder").then((res) => setReminderList(res.data));
//   }, []);

//   const addReminder = () => {
//     axios
//       .post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
//       .then((res) => setReminderList(res.data));
//     setReminderMsg("");
//     setRemindAt(new Date()); // Reset the date
//   };

//   const deleteReminder = (id) => {
//     axios.post("http://localhost:4000/deleteReminder", { id }).then((res) => setReminderList(res.data));
//   };

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//     }
//   }, [user]);

//   async function participateinevent() {
//     console.log('host:', host);
//     console.log('host._id:', host._id);
//     console.log('name:', name);
//     console.log('whatsappNo:', whatsappNo);
//     if (host && host._id) {
//       const response = await axios.post('/participated', {
//         host: host._id,
//         name,
//         whatsappNo,
//       });
//       const participatedId = response.data._id;
//       setRedirect(`/account/participated/${participatedId}`);
//     } else {
//       // Handle the case when host or host._id is undefined
//       console.error("Host or host._id is undefined.");
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />
//   }

//   // Inline CSS for the DateTimePicker component
//   const dateTimePickerStyles = {
//     width: "100%", // Set the width as needed
//     padding: "10px", // Adjust the padding
//     border: "1px solid #ccc", // Add a border
//     borderRadius: "5px", // Round the corners
//   };

// // ... (Previous code remains unchanged)

// return (
//   <>
//     <div className="bg-white shadow p-4 rounded-2xl">
//       <div className="text-2xl text-center">Vamunique</div>
//       <div className="border rounded-2xl mt-4">
//         <div className="py-3 px-4">
//           <label>Your name</label>
//           <input
//             type="text"
//             value={name}
//             placeholder="John Doe"
//             onChange={(ev) => setName(ev.target.value)}
//           />
//         </div>
//         <div className="py-3 px-4 border-t">
//   <label>Your WhatsApp no.</label>
//   <input
//     type="number"
//     value={whatsappNo}
//     placeholder="Whatsapp Number"
//     maxLength={12} // Limit input to 10 characters
//     onChange={(ev) => {
//       const input = ev.target.value.slice(0, 12); // Limit input to 10 characters
//       setwhatsappNo(input);
//     }}
//   />
// </div>

//       </div>
//       <button onClick={participateinevent} className="primary mt-4">
//         Participate
//       </button>
//     </div>

//     {/* Notification Card */}
//     <div className="bg-white shadow p-4 rounded-2xl mt-4">
//       <div className="text-2xl text-center">Notification</div>
//       <div className="py-3 px-4">
//         <p>To receive notifications, save +14155238886 as a contact on WhatsApp and send a message with the text "join kind-when" to it.</p>
//       </div>
//     </div>
//   </>
// );

// }


import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import DateTimePicker from "react-datetime-picker";

export default function BookingWidget({ host }) {
  const [name, setName] = useState('');
  const [whatsappNo, setwhatsappNo] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(new Date()); // Initialize with a default date
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getAllReminder").then((res) => setReminderList(res.data));
  }, []);

  const addReminder = () => {
    axios
      .post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
      .then((res) => setReminderList(res.data));
    setReminderMsg("");
    setRemindAt(new Date()); // Reset the date
  };

  const deleteReminder = (id) => {
    axios.post("http://localhost:4000/deleteReminder", { id }).then((res) => setReminderList(res.data));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function participateinevent() {
    console.log('host:', host);
    console.log('host._id:', host._id);
    console.log('name:', name);
    console.log('whatsappNo:', whatsappNo);
    if (host && host._id) {
      const response = await axios.post('/participated', {
        host: host._id,
        name,
        whatsappNo,
      });
      const participatedId = response.data._id;
      setRedirect(`/account/participated/${participatedId}`);
    } else {
      // Handle the case when host or host._id is undefined
      console.error("Host or host._id is undefined.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Inline CSS for the DateTimePicker component
  const dateTimePickerStyles = {
    width: "100%", // Set the width as needed
    padding: "10px", // Adjust the padding
    border: "1px solid #ccc", // Add a border
    borderRadius: "5px", // Round the corners
  };

  return (
    <>
      <div className="bg-gray-800 shadow p-4 rounded-2xl animate__animated animate__fadeIn">
        <div className="text-2xl text-center text-white">Vamunique</div>
        <div className="border rounded-2xl mt-4 transform hover:scale-105 transition-transform bg-gray-700">
          <div className="py-3 px-4">
            <label className="text-white">Your name</label>
            <input
              type="text"
              value={name}
              placeholder="John Doe"
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border-b-2 focus:outline-none focus:border-purple-500 text-black"
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label className="text-white">Your WhatsApp no.</label>
            <input
              type="number"
              value={whatsappNo}
              placeholder="Whatsapp Number"
              maxLength={12} // Limit input to 12 characters
              onChange={(ev) => {
                const input = ev.target.value.slice(0, 12); // Limit input to 12 characters
                setwhatsappNo(input);
              }}
              className="w-full border-b-2 focus:outline-none focus:border-purple-500 text-black"
            />
          </div>
        </div>
        <button onClick={participateinevent} className="primary mt-4 transform hover:scale-105 transition-transform bg-gray-600">
          Participate
        </button>
      </div>

      {/* Notification Card */}
      <div className="bg-gray-800 shadow p-4 rounded-2xl mt-4 animate__animated animate__fadeIn">
        <div className="text-2xl text-center text-white">Notification</div>
        <div className="py-3 px-4 text-white">
          <p>To receive notifications, save +14155238886 as a contact on WhatsApp and send a message with the text "join kind-when" to it.</p>
        </div>
      </div>
    </>
  );
}
