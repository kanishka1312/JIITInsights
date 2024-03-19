// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from 'react-router-dom'

// export default function ListAdmins() {

//     const [admins, setAdmins] = useState([]);
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (localStorage.getItem('type') !== 'ADMIN') {
//             navigate('/')
//         }
//     }, [])

//     useEffect(() => {
//         axios.get('http://localhost:4000/admin/admins')
//             .then(res => {
//                 // console.log(res.data);
//                 setAdmins(res.data.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }, [])

//     return (
//         <div className="">
//             <h1 className="">List of Admins</h1>
//             <div>
//             {
//                 admins.length > 0 &&
//                 admins.map((adminItem, adminIndex) => {
//                     return(
//                         <div className="flex gap-20 ">
//                             <div>{ adminItem.userName }</div>
//                             <div>{ adminItem.password }</div>
//                             <div>{ adminItem.type }</div>
//                             <div>{ adminItem.society }</div>
//                         </div>
//                     )
//                 })  
//             }
//             </div>
//         </div>
//     );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom'

// export default function ListAdmins() {
//     const [admins, setAdmins] = useState([]);
//     const navigate = useNavigate();

//     // useEffect(() => {
//     //     if (localStorage.getItem('type') !== 'ADMIN') {
//     //         navigate('/');
//     //     } else {
//     //         // Fetch the list of admins only if the user is an admin
//     //         axios.get('http://localhost:4000/admin/admins')
//     //             .then(res => {
//     //                 setAdmins(res.data.data);
//     //             })
//     //             .catch(err => {
//     //                 console.log(err);
//     //             });
//     //     }
//     // }, [navigate]);

//     return (
//         <div className="">
//             <h1 className="">List of Admins</h1>
//             <div>
//                 {
//                     admins.length > 0 &&
//                     admins.map((adminItem, adminIndex) => (
//                         <div className="flex gap-20" key={adminIndex}>
//                             <div>{adminItem.userName}</div>
//                             <div>{adminItem.password}</div>
//                             <div>{adminItem.type}</div>
//                             <div>{adminItem.society}</div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     );
// }


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from 'react-router-dom'

// // export default function ListAdmins() {
// //     const [admins, setAdmins] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const role = localStorage.getItem('role');

// //         // Check if the user has the 'admin' role before proceeding
// //         if (role !== 'admin') {
// //             navigate('/');
// //             return; // Exit the function early if not an admin
// //         }

// //         // Fetch the list of admins
// //         axios.get('http://localhost:4000/admin/admins')
// //             .then(res => {
// //                 setAdmins(res.data.data);
// //             })
// //             .catch(err => {
// //                 console.log(err);
// //             });
// //     }, [navigate]);

// //     return (
// //         <div className="">
// //             {admins.length > 0 && (
// //                 <>
// //                     <h1 className="">List of Admins</h1>
// //                     <div>
// //                         {admins.map((adminItem, adminIndex) => (
// //                             <div className="flex gap-20" key={adminIndex}>
// //                                 <div>{adminItem.userName}</div>
// //                                 <div>{adminItem.password}</div>
// //                                 <div>{adminItem.type}</div>
// //                                 <div>{adminItem.society}</div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// export default function ListAdmins() {
//     const [admins, setAdmins] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('role');

//         // Check if the user has the 'admin' role before proceeding
//         if (role == 'admin') {
//             navigate('/');
//             return; // Exit the function early if not an admin
//         }

//         // Fetch the list of admins
//         axios.get('http://localhost:4000/admin/admins')
//             .then(res => {
//                 setAdmins(res.data.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, [navigate]);

//     return (
//         <div className="">
//             {admins.length > 0 && (
//                 <>
//                     <h1 className="">List of Admins</h1>
//                     <div>
//                         {admins.map((adminItem, adminIndex) => (
//                             <div className="flex gap-20" key={adminIndex}>
//                                 <div>{adminItem.userName}</div>
//                                 <div>{adminItem.adminPassword}</div> {/* Assuming this is the admin password field */}
//                                 <div>{adminItem.type}</div>
//                                 {/* Uncomment the next line if the 'society' field is present */}
//                                 {/* <div>{adminItem.society}</div> */}
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ListAdmins() {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');

        // Check if the user has the 'admin' role before proceeding
        if (role == 'admin') {
            navigate('/');
            return; // Exit the function early if not an admin
        }

        // Fetch the list of admins
        axios.get('http://localhost:4000/admin/admins')
            .then(res => {
                setAdmins(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [navigate]);

    return (
        <div className="">
            {admins.length > 0 && (
                <>
                    <h1 className="">List of Admins</h1>
                    <div>
                        {admins.map((adminItem, adminIndex) => (
                            <div className="flex gap-20 text-white" key={adminIndex}>
                                <div>{adminItem.userName}</div>
                                <div>{adminItem.email}</div> {/* Use email field for both user and admin */}
                                <div>{adminItem.adminPassword}</div>
                                <div>{adminItem.type}</div>
                                {/* Uncomment the next line if the 'society' field is present */}
                                {/* <div>{adminItem.society}</div> */}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
