// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({children}) {
//     const [user, setUser] = useState(null);
//     const [ready,setReady] = useState(false);
//     useEffect(() => {
//        if(!user){
//         axios.get('/profile').then(({data}) => {
//         setUser(data);
//         setReady(true);
//         });
//        }
//     }, []);
//     return (
//         <UserContext.Provider value={{user, setUser, ready}}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({children}) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({data}) => {
//                 setUser(data);
//                 setReady(true);
//             });
//         }
//     }, []);

//     const isAdmin = user && user.role === 'admin';

//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// UserContext.js

// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 setUser(data);
//                 setReady(true);
//             });
//         }
//     }, []);

//     // Modify this logic based on your actual criteria for determining admin status
//     const isAdmin = user && user.isAdmin === true;

//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }


// UserContext.js

// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);

//     // useEffect(() => {
//     //     if (!user) {
//     //         axios.get('/profile').then(({ data }) => {
//     //             setUser(data);
//     //             setReady(true);
//     //         });
//     //     }
//     // }, []);

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);  // Log the entire user object
//                 setUser(data);
//                 setReady(true);
//             });
//         }
//     }, []);
    

//     // Check if the user is an admin based on your model's "type" field
//     // const isAdmin = user && user.type === 'ADMIN';

//     // console.log("User data:", user);
//     // console.log("isAdmin:", isAdmin);

//     const isAdmin = user && (user.type === 'ADMIN' || user.type === 'Head');
// console.log("User data:", user);
// console.log("isAdmin:", isAdmin);


//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(false);  // Added isAdmin state

//     useEffect(() => {
//         if (!user) {
//             console.log("user inside",user)
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);
//                 setUser(data);

//                 // Set isAdmin based on the user's type received from the server
//                 const isAdminUser = data && (data.type === 'ADMIN' || data.type === 'Head');
//                 setIsAdmin(isAdminUser);

//                 setReady(true);
//             });
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }


// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);
//                 setUser(data);

//                 // Set isAdmin based on the user's role received from the server
//                 const isAdminUser = data && (data.role === 'admin');
//                 setIsAdmin(isAdminUser);

//                 setReady(true);
//             });
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// import { createContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);
//                 setUser(data);
//                  console.log("data.role",data.role)
//                 // Set isAdmin based on the user's role received from the server
//                 const isAdminUser = data && (data.role === 'admin');
//                 setIsAdmin(isAdminUser);

//                 setReady(true);
//             });
//         }
//     }, [user]); // Added user as a dependency to useEffect

//     return (
//         <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     if (!user) {
    //         axios.get('/profile').then(({ data }) => {
    //             console.log("User object from server:", data);
    //             setUser(data);
    //             console.log("data.role", data.role);
    //             // Set isAdmin based on the user's role received from the server
    //             const isAdminUser = data && data.role === 'admin';
    //             setIsAdmin(isAdminUser);

    //             setReady(true);
    //         });
    //     }
    // }, []); // Empty dependency array

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    console.log("User object from server:", data);
                    setUser(data);
    
                    // Set isAdmin based on the user's role received from the server
                    const isAdminUser = data && data.role === 'admin';
                    setIsAdmin(isAdminUser);
    
                    setReady(true);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setReady(true); // Set ready even in case of an error
                });
        }
    }, [user]); // Dependency array includes 'user'
    

    return (
        <UserContext.Provider value={{ user, setUser, ready, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
}
