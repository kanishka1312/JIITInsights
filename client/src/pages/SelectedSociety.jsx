import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function SelectedSociety() {
    const { selectedSociety } = useParams(); // Assuming 'selectedSociety' is the parameter in your route
    const [hosted, setHosted] = useState([]);

    useEffect(() => {
        axios.get('/user-hosted').then(response => {
            setHosted(response.data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4">
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {hosted.length > 0 && hosted.map(host => (
                    // Check if host.title matches selectedSociety before rendering the event
                    host.title === selectedSociety && (
                        <Link
                            to={'/host/' + host._id}
                            key={host._id}
                            className="bg-gray-900 hover:bg-gray-800 mb-2 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            {host.photos?.[0] && (
                                <img
                                    className="rounded-t-2xl object-cover aspect-square"
                                    src={'http://localhost:4000/uploads/' + host.photos?.[0]}
                                    alt=''
                                />
                            )}
                            <div className="p-4">
                                <h2 className="font-bold truncate text-xl">{host.title}</h2>
                                <h3 className="text-sm">{host.venue}</h3>
                                <div className="mt-1">
                                    <span className="font-bold">{host.date}</span>
                                </div>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
}
