
// import React, { useContext, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const { setUser } = useContext(UserContext);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   function validateEmail(email) {
//     const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
//     return emailRegex.test(email);
//   }

//   function validatePassword(password) {
//     return password.length >= 8;
//   }

//   async function handleLoginSubmit(ev) {
//     ev.preventDefault();

//     // Check if email is provided
//     if (!email.trim()) {
//       setEmailError('Email is required');
//       return;
//     } else if (!validateEmail(email)) {
//       setEmailError('Invalid email format');
//       return;
//     } else {
//       setEmailError('');
//     }

//     // Check if password is provided
//     if (!password.trim()) {
//       setPasswordError('Password is required');
//       return;
//     } else if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 8 characters long');
//       return;
//     } else {
//       setPasswordError('');
//     }

//     try {
//       const { data } = await axios.post('/login', { email, password });
//       setUser(data);

//       alert('Login successful.');
//       setRedirect(true);
//     } catch (e) {
//       alert('Login failed.');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div className="mb-48">
//         <h1 className="text-2xl text-center mb-4">Login</h1>
//         <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
//           <input
//             type="email"
//             placeholder="Gsuite id"
//             value={email}
//             onChange={(ev) => setEmail(ev.target.value)}
//           />
//           {emailError && <p className="text-red-500">{emailError}</p>}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="password min length should be 8"
//               value={password}
//               onChange={(ev) => setPassword(ev.target.value)}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-2 cursor-pointer"
//             >
//               <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//             </span>
//           </div>
//           {passwordError && <p className="text-red-500">{passwordError}</p>}
//           <button className="primary">Login</button>
//           <div className="text-center py-2 text-gray-500">
//             <Link className="underline text-black" to={"/forgot-password"}>
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="text-center py-2 text-gray-500">
//             <p>Admin login:</p>
//             <Link className="underline text-black" to={"/admin/login"}>
//               Login as Admin
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import Tilt from 'react-parallax-tilt';
import '../App.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    // Check if email is provided
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Check if password is provided
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);

      alert('Login successful.');
      setRedirect(true);
    } catch (e) {
      alert('Login failed.');
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="App bg-black h-screen w-screen relative overflow-hidden flex justify-center items-center">
    <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
    <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
    <Tilt>
    <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm overflow-hidden">
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-48">
          <h1 className="text-2xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto h-full flex flex-col justify-evenly items-center" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="College email id"
              className='input-text'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <div className="relative flex">
              <input
                type={showPassword ? "text" : "password"}
                className='input-text'
                placeholder="password (min length 8)"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-white"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <button className=" cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 mt-2">Login</button>
           
           <div className="flex gap-2">            
           <div className="text-center py-2 text-gray-500 text-sm ">
              <Link className="underline text-white" to={"/forgot-password"}>
                Forgot Password?
              </Link>
            </div>
            <div className="text-center py-2 text-gray-500 text-sm">
              <Link className="underline text-white" to={"/admin/login"}>
                Login Admin
              </Link>
            </div></div>

            {/* Registration Link */}
            <div className="text-center py-2 text-gray-500">
              <p>Don't have an account?</p>
              <Link className="underline text-white" to={"/register"}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Tilt>
  </div>
  
  );
}
