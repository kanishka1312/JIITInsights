
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function Header() {
    const { user, isAdmin } = useContext(UserContext);
    console.log("user", user);
    console.log("isAdmin", isAdmin);

    return (
        <div>
            <header className="flex justify-between bg-black">
                {/* logo */}
                <div className="flex items-center gap-1">
                    <img src="/images/logo.png" className="w-24 h-auto" alt="" />
                </div>
                {/* user widget */}
                <Link
                    to={user ? "/account" : "/login"}
                    className="flex items-center gap-2 py-2 px-4 text-white text-sm focus:outline-none"
                >
                    {/* navbar */}
                    <div className='flex gap-4 py-2 px-4 bg-black'>
                        <Link to="/" className="flex items-center text-white text-sm font-normal focus:outline-none">Home</Link>
                        <Link to="/merchandise" className="flex items-center text-white text-sm font-normal focus:outline-none">Merchandise</Link>
                        <Link to="/contact" className="flex items-center text-white text-sm font-normal focus:outline-none rounded-full" style={{ backgroundColor: '#800080', width: '80px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Contact</Link>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user && (
                        <div className="text-white text-base ">
                            {user.name}
                            {isAdmin && <span> (Admin: {user.userName})</span>}
                        </div>
                    ) : isAdmin && user ? (
                        <div>
                            {user.userName}
                        </div>
                    ) : null}
                </Link>

                {/* Conditionally render the "Add Admin" link */}
             
            </header>
        </div>
    );
}
