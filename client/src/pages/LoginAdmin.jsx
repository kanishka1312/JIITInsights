import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import '../App.css'

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleClick = () => {
        // Validate password
        if (!validatePassword(adminPassword)) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        } else {
            setPasswordError('');
        }

        axios
            .post('http://localhost:4000/admin/login', {
                userName: userName,
                adminPassword: adminPassword,
            })
            .then((res) => {
                if (res.data.code === 200 && res.data.role === 'admin') {
                    const { token } = res.data;
                    localStorage.setItem('token', token);

                    navigate('/');
                } else {
                    console.error('Login failed:', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="App bg-black h-screen w-screen relative overflow-hidden flex justify-center items-center">
            <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
            <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
            <Tilt>
                <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm overflow-hidden">
                    <div className="card-admin flex items-center justify-center h">
                        <div className="max-w-md mx-auto ">
                            <h1 className="text-2xl text-center mb-4">Login Admin</h1>
                            <Link to="/login" className="text-blue-500">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Back to Login
                            </Link>
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="User Name"
                                className="input-admin mb-4 input-text border border-radius text-white"
                                type="text"
                            />

                            <input
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="Password (min length 8)"
                                className={`input-text input-admin mb-4 ${passwordError ? 'border-red-500' : ''}`}
                                type="password"
                            />
                            {passwordError && <p className="text-red-500">{passwordError}</p>}
                            <button onClick={handleClick}  className='primary text-black cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Tilt>
        </div>
    );
};

export default LoginAdmin;








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