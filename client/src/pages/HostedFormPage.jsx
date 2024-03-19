
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AccountNav from "../AccountNav";
// import { Navigate, useParams } from "react-router-dom";
// import PhotosUploader from "../PhotosUploader";
// import Perks from "../Perks";

// export default function HostedFormPage() {
//     const { id } = useParams();
//     const [title, setTitle] = useState('');
//     const [addedPhotos, setAddedPhotos] = useState([]);
//     const [venue, setVenue] = useState('');
//     const [description, setDescription] = useState('');
//     const [perks, setPerks] = useState([]);
//     const [extraInfo, setExtraInfo] = useState('');
//     const [time, setTime] = useState('');
//     const [date, setDate] = useState('');
//     const [redirect, setRedirect] = useState(false);

//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         axios.get('/hosted/' + id).then(response => {
//             const { data } = response;
//             setTitle(data.title);
//             setVenue(data.venue);
//             setAddedPhotos(data.photos);
//             setDescription(data.description);
//             setPerks(data.perks);
//             setTime(data.time);
//             setDate(data.date);
//         });
//     }, [id]);

//     function inputHeader(text) {
//         return (
//             <h2 className="text-2xl mt-4">{text}</h2>
//         );
//     }

//     function inputDescription(text) {
//         return (
//             <p className="text-gray-500 text-sm">{text}</p>
//         );
//     }

//     function preInput(header, description) {
//         return (
//             <>
//                 {inputHeader(header)}
//                 {inputDescription(description)}
//             </>
//         );
//     }

//     async function saveEvent(ev) {
//         ev.preventDefault();

//         const hostedData = {
//             title, venue, addedPhotos,
//             description, perks, extraInfo,
//             time, date
//         }

//         // Ensure date and time are not from the past
//         const currentIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//         const currentDateTime = new Date(currentIST).toISOString();

//         const currentDate = currentDateTime.slice(0, 10);
//         const currentTime = currentDateTime.slice(11, 16);

//         if (date < currentDate || (date === currentDate && time < currentTime)) {
//             alert('Please select a date and time in the future.');
//             return;
//         }

//         if (id) {
//             // Update
//             await axios.put('/hosted', {
//                 id,
//                 ...hostedData
//             });
//             setRedirect(true);
//         } else {
//             // New place
//             await axios.post('/account/hosted', hostedData);
//             setRedirect(true);
//         }
//     }

//     if (redirect) {
//         return <Navigate to={'/account/hosted'} />;
//     }

//     return (
//         <div>
//             <AccountNav />
//             <form onSubmit={saveEvent}>
//                 {preInput('Name', 'Name of your Society')}
//                 <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} className = "input-text " placeholder='name, ex:vamunique' />
//                 {preInput('Venue', 'Venue for this event')}
//                 <input type='text' value={venue} onChange={ev => setVenue(ev.target.value)} className = "input-text" placeholder='venue' />
//                 {preInput('Photos', 'more=better')}
//                 <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
//                 {preInput('Description', 'Description of the event')}
//                 <textarea value={description} onChange={ev => setDescription(ev.target.value)} className = "input-text"/>

//                 {preInput('time & date', 'Date & time of the event')}
//                 <div className="grid gap-2 sm:grid-cols-3">
//                     <div>
//                         <h3 className="mt-2 -mb-1">Time</h3>
//                         <input
//                             className=""
//                             type="time"
//                             value={time}
//                             onChange={(ev) => setTime(ev.target.value)}
//                             min={new Date().toISOString().slice(11, 16)}
//                         />
//                     </div>
//                     <div>
//                         <h3 className="mt-2 -mb-1 ">Date</h3>
//                         <input
//                             type="date"
//                             value={date}
//                             onChange={(ev) => setDate(ev.target.value)}
//                             min={new Date().toISOString().slice(0, 10)}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text w-screen h-12 mt-6">Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";

export default function HostedFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/hosted/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setVenue(data.venue);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setTime(data.time);
            setDate(data.date);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function saveEvent(ev) {
        ev.preventDefault();

        const hostedData = {
            title, venue, addedPhotos,
            description, perks, extraInfo,
            time, date
        }

        // Ensure date and time are not from the past
        const currentIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const currentDateTime = new Date(currentIST).toISOString();

        const currentDate = currentDateTime.slice(0, 10);
        const currentTime = currentDateTime.slice(11, 16);

        if (date < currentDate || (date === currentDate && time < currentTime)) {
            alert('Please select a date and time in the future.');
            return;
        }

        if (id) {
            // Update
            await axios.put('/hosted', {
                id,
                ...hostedData
            });
            setRedirect(true);
        } else {
            // New place
            await axios.post('/account/hosted', hostedData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/hosted'} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={saveEvent}>
                {preInput('Title', 'Title for your Event. Should be short and catchy as in advertisement')}
                <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, for example: bds fusion' />
                {preInput('Venue', 'Venue for this event')}
                <input type='text' value={venue} onChange={ev => setVenue(ev.target.value)} placeholder='venue' />
                {preInput('Photos', 'more=better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of the event')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all perks for your event')}
                <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('time & date', 'Date & time of the event')}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1 ">Time</h3>
                        <input
                            type="time"
                            value={time}
                            onChange={(ev) => setTime(ev.target.value)}
                            min={new Date().toISOString().slice(11, 16)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">Date</h3>
                        <input
                            type="date"
                            value={date}
                            onChange={(ev) => setDate(ev.target.value)}
                            min={new Date().toISOString().slice(0, 10)}
                        />
                    </div>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    );
}