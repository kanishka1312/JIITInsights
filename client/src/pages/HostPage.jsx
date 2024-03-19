import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AccountNav from "../AccountNav";
import HostImage from "../HostImage";
import { UserContext } from "../UserContext";

const HostPage = () => {
    const [hosted, setHosted] = useState([]);
    const navigate = useNavigate();
    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        // Redirect to the home page if the user is not an admin
        console.log("isAdmin:", isAdmin);
        // if (!isAdmin) {
        //     console.log("Redirecting to home");
        //     navigate('/');
        // } 
        // else {
            // Fetch hosted events only for admins
            axios.get('/account/hosted').then(({ data }) => {
                console.log("Hosted events:", data);
                setHosted(data);
            }).catch(error => {
                console.error("Error fetching hosted events:", error);
            });
        //}
    }, [isAdmin, navigate]);

    if (!isAdmin) {
        // Render nothing if the user is not an admin
        return null;
    }

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className='h-12 lex justify-center items-center inline-flex gap-1 border border-radius bg-primary text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 via-yellow-500 from-purple-500 to-red-500 text-transparent bg-clip-text text-smpy-2 px-6 rounded-full' to="/account/hosted/new">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" className="text-white"/>
                    </svg>
                    Add new event
                </Link>
            </div>
            <div className="mt-4">
                {hosted.length > 0 && hosted.map(host => (
                    <Link to={'/account/hosted/' + host._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl" key={host._id}>
                        <div className="flex w-48 h-48 bg-gray-300">
                            <HostImage host={host} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{host.title}</h2>
                            <p className="text-sm mt-2">{host.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HostPage;