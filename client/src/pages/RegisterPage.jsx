

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// export default function RegisterPage() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     async function registerUser(ev) {
//         ev.preventDefault();
//         try {
//             await axios.post("/register", {
//                 name,
//                 email,
//                 password,
//             });
//             alert('Registration successful. Now you can log in.');
//         } catch (e) {
//             alert('Registration failed. Please try again later.');
//         }
//     }

//     return (
//         <div className="mt-4 grow flex items-center justify-around">
//             <div className="mb-48">
//                 <h1 className="text-2xl text-center mb-4">Register</h1>
//                 <form className="max-w-md mx-auto" onSubmit={registerUser}>
//                     <input
//                         type="text"
//                         placeholder="JohnDoe"
//                         value={name}
//                         onChange={(ev) => setName(ev.target.value)}
//                     />
//                     <input
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(ev) => setEmail(ev.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="password"
//                         value={password}
//                         onChange={(ev) => setPassword(ev.target.value)}
//                     />
//                     <button className="primary">Register</button>
//                     <div className="text-center py-2 text-gray-500">
//                         Already a member?{" "}
//                         <Link className="underline text-black" to={"/login"}>
//                             Login
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// export default function RegisterPage() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     function validateEmail(email) {
//         const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
//         return emailRegex.test(email);
//     }

//     function validatePassword(password) {
//         return password.length >= 8;
//     }

//     async function registerUser(ev) {
//         ev.preventDefault();

//         // Check if email is provided and valid
//         if (!email.trim()) {
//             setEmailError('Email is required');
//             return;
//         } else if (!validateEmail(email)) {
//             setEmailError('Invalid email format');
//             return;
//         } else {
//             setEmailError('');
//         }

//         // Check if password is provided and valid
//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             return;
//         } else if (!validatePassword(password)) {
//             setPasswordError('Password must be at least 8 characters long');
//             return;
//         } else {
//             setPasswordError('');
//         }

//         try {
//             await axios.post("/register", {
//                 name,
//                 email,
//                 password,
//             });
//             alert('Registration successful. Now you can log in.');
//         } catch (e) {
//             alert('Registration failed. Please try again later.');
//         }
//     }

//     return (
//         <div className="mt-4 grow flex items-center justify-around">
//             <div className="mb-48">
//                 <h1 className="text-2xl text-center mb-4">Register</h1>
//                 <form className="max-w-md mx-auto" onSubmit={registerUser}>
//                     <input
//                         type="text"
//                         placeholder="JohnDoe"
//                         value={name}
//                         onChange={(ev) => setName(ev.target.value)}
//                     />
//                     <input
//                         type="email"
//                         placeholder="your@email.com"
//                         value={email}
//                         onChange={(ev) => setEmail(ev.target.value)}
//                     />
//                     {emailError && <p className="text-red-500">{emailError}</p>}
//                     <input
//                         type="password"
//                         placeholder="password"
//                         value={password}
//                         onChange={(ev) => setPassword(ev.target.value)}
//                     />
//                     {passwordError && <p className="text-red-500">{passwordError}</p>}
//                     <button className="primary">Register</button>
//                     <div className="text-center py-2 text-gray-500">
//                         Already a member?{" "}
//                         <Link className="underline text-black" to={"/login"}>
//                             Login
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


// Import useNavigate from react-router-dom
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Tilt from 'react-parallax-tilt';
import '../App.css'

export default function RegisterPage() {
    // Use useNavigate instead of useHistory
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function validateEmail(email) {
        const emailRegex = /^\d{6}$|^\d{10}$|^\d{6}@mail\.jiit\.ac\.in$|^\d{10}@mail\.jiit\.ac\.in$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    async function registerUser(ev) {
        ev.preventDefault();

        // Check if email is provided and valid
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        } else {
            setEmailError('');
        }

        // Check if password is provided and valid
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
            await axios.post("/register", {
                name,
                email,
                password,
            });
            alert('Registration successful. Now you can log in.');
            // Use navigate function instead of history.push
            navigate('/login');
        } catch (e) {
            alert('Registration failed. Please try again later.');
        }
    }

    return (
        <div className="App bg-black h-screen w-screen relative overflow-hidden flex justify-center items-center">
        <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
        <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
        <Tilt>
        <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col justify-evenly items-center mt-4 grow flex items-center justify-around">
            <div className="mb-48">
                <h1 className="text-2xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto h-full flex flex-col justify-evenly items-center" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="JohnDoe"
                        className='input-text text-white border border-radius'
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="College email id"
                        className='input-text'
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password (min length 8)"
                        className='input-text'
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    <button className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '>Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?{" "}
                        <Link className="underline text-white text-sm" to={"/login"}>
                            Login
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