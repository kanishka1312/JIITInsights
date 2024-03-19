import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import HostPage from "./HostPage";
import AccountNav from "../AccountNav";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser, isAdmin } = useContext(UserContext);
//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = 'profile';
//     }

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);
//                 setUser(data);
//                 setRedirect(null); // Reset redirect state
//             });
//         }
//     }, [user, setUser]);

//     // async function logout() {
//     //     await axios.post('/logout');
//     //     setRedirect('/');
//     //     setUser(null);
//     // }
//     async function logout() {
//         try {
//             await axios.post('/logout');
//             setRedirect('/');
//             setUser(null);
//         } catch (error) {
//             console.error('Error during logout:', error);
//             // Handle the error as needed, e.g., show a message to the user
//         }
//     }
    

//     if (!ready) {
//         return 'Loading...';
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={'/login'} />;
//     }

//     if (redirect) {
//         return <Navigate to={redirect} />;
//     }

//     return (
//         <div>
//             <AccountNav />
//             {subpage === 'profile' && (
//                 <div className="text-center max-w-lg mx-auto">
//                     Logged in as {user.name} ({user.email})<br />
//                     {isAdmin && (
//                         <div>
//                             Admin Username: {user.userName}<br />
//                             {/* Admin Password: {user.adminPassword} */}
//                         </div>
//                     )}
//                     <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
//                 </div>
//             )}
//             {subpage === 'hosted' && (
//                 <HostPage />
//             )}
//         </div>
//     );
// }


export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser, isAdmin } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        console.log("User object from server:", data);
        setUser(data);
        setRedirect(null); // Reset redirect state
      });
    }
  }, [user, setUser]);

  // Move the logout function declaration outside of the useEffect
  async function logout() {
    try {
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle the error as needed, e.g., show a message to the user
    }
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    {isAdmin && (
                        <div>
                            Admin Username: {user.userName}<br />
                            {/* Admin Password: {user.adminPassword} */}
                        </div>
                    )}
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'hosted' && (
                <HostPage />
            )}
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