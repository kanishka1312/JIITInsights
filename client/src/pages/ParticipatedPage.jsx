import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import HostImage from "../HostImage";
import { Link } from "react-router-dom";
import ParticipatedDateTime from "../ParticipatedDateTime";

export default function ParticipatedPage() {
    const [participated, setParticipated] = useState([]);
    useEffect(() => {
        axios.get('/participated').then(response => {
            setParticipated(response.data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="my-2 space-y-4">
                {participated?.length > 0 && participated.map(participate => (
                    <Link to={`/account/participated/${participate._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden transition-transform hover:translate-x-4 hover:translate-y-4 hover:shadow-lg">
                        <div className="w-48">
                            {participate.host && <HostImage host={participate.host} />}
                        </div>
                        <div className="py-3 grow pr-3">
                        <h2 className="text-2xl bold flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 via-yellow-500 from-purple-500 to-red-500 text-transparent bg-clip-text text-sm font-normal focus:outline-none">{participate.host ? participate.host.title : 'No Title'}</h2>
                            <div className="flex border-t border-gray-300 mt-2 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <h2 className="text-sm flex items-center bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 via-teal-500 from-blue-500 to-green-500 text-transparent bg-clip-text text-sm font-normal focus:outline-none">{participate.host ? participate.host.venue : 'No Venue'}</h2>
                            </div>
                            <ParticipatedDateTime participate={participate}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}