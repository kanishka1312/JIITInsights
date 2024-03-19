// ForgotPasswordPage.js
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import '../App.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');

  function validateEmail(email) {
    const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
    return emailRegex.test(email);
  }

  async function handleForgotPassword(ev) {
    ev.preventDefault();

    // Check if email is provided
    if (!email.trim()) {
      setResetPasswordError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setResetPasswordError('Invalid email format');
      return;
    } else {
      setResetPasswordError('');
    }

    try {
      // Send a request to the server to initiate the password reset
      await axios.post('/forgot-password', { email });
      setResetPasswordSuccess(true);
    } catch (error) {
      setResetPasswordError('Password reset failed. Please try again.');
    }
  }

  if (resetPasswordSuccess) {
    return <div>Password reset instructions sent to your email.</div>;
  }

  return (
    <div className="App bg-black h-screen w-screen relative overflow-hidden flex justify-center items-center">
      <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
      <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
      <Tilt>
        <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm overflow-hidden">
          <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-48">
              <h1 className="text-2xl text-center mb-4">Forgot Password</h1>
              <Link to="/login" className="text-blue-500">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Login
              </Link>
              <form className='py-1 h-full flex flex-col justify-evenly items-center' onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className='input-text'
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                {resetPasswordError && <p className="text-red-500">{resetPasswordError}</p>}
                <button className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '>ResetPass</button>
              </form>
              </div>
            </div>
          </div>
      </Tilt>
    </div>

  );
}







{
  /*<div className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
    <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
    <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
    <Tilt>
      <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
        <form className='h-full flex flex-col justify-evenly items-center'>
          <div className='text-white font-poppins text-2xl tracking-widest'>Login form</div>
          <input type="text" placeholder='username' className='input-text'/>
          <input type="password" placeholder='password' className='input-text'/>
          <input type="Submit" className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '/>
        </form>
      </div>
    </Tilt>
  </div> */ }