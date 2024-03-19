// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const { token } = useParams();
//     const [newPassword, setNewPassword] = useState('');
//     const [resetStatus, setResetStatus] = useState(null); // To store the status of password reset
//     const navigate = useNavigate();

//     const handleResetPassword = async () => {
//         try {
//             const response = await fetch('http://localhost:5173/api/reset-password/' + token, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//                 body: JSON.stringify({
//                     newPassword,
//                 }),
//             });

//             if (response.ok) {
//                 // Password reset successful
//                 setResetStatus({ success: true, message: 'Password reset successful!' });
//                 // You can navigate the user to the login page or any other page
//                 // navigate('/login');
//             } else {
//                 // Password reset failed
//                 setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
//             }
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
//         }
//     };

//     return (
//         <div>
//             <h1>Password Reset Page</h1>
//             <label>New Password:</label>
//             <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleResetPassword}>Reset Password</button>

//             {resetStatus && (
//                 <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
//                     {resetStatus.message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPage;


// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const { token } = useParams();
//     const [newPassword, setNewPassword] = useState('');
//     const [resetStatus, setResetStatus] = useState(null); // To store the status of password reset
//     const navigate = useNavigate();
//     const apiUrl = `http://localhost:5173/api/reset-password/${token}`;
//     console.log('API URL:', apiUrl);

//     const handleResetPassword = async () => {
//         console.log('Resetting password with newPassword:', newPassword, 'and token:', token);

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     newPassword,
//                 }),
//             });

//             if (response.ok) {
//                 // Password reset successful
//                 setResetStatus({ success: true, message: 'Password reset successful!' });
//                 // You can navigate the user to the login page or any other page
//                 // navigate('/login');
//             } else {
//                 // Password reset failed
//                 setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
//             }
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
//         }
//     };

//     return (
//         <div>
//             <h1>Password Reset Page</h1>
//             <label>New Password:</label>
//             <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleResetPassword}>Reset Password</button>

//             {resetStatus && (
//                 <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
//                     {resetStatus.message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const { token } = useParams();
//     const [newPassword, setNewPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [resetStatus, setResetStatus] = useState(null);
//     const navigate = useNavigate();
//     const apiUrl = `http://localhost:5173/api/reset-password/${token}`;
//     console.log('API URL:', apiUrl);

//     useEffect(() => {
//         // Fetch the email associated with the token
//         const fetchEmail = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5173/api/reset-password-info/${token}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setEmail(data.email);
//                 } else {
//                     // Handle error
//                     console.error('Error fetching email:', response.statusText);
//                 }
//             } catch (error) {
//                 // Handle error
//                 console.error('Error fetching email:', error);
//             }
//         };

//         fetchEmail();
//     }, [token]);

//     const handleResetPassword = async () => {
//         console.log('Resetting password with newPassword:', newPassword, 'email:', email, 'and token:', token);

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     newPassword,
//                     email,
//                 }),
//             });

//             if (response.ok) {
//                 // Password reset successful
//                 setResetStatus({ success: true, message: 'Password reset successful!' });
//                 // You can navigate the user to the login page or any other page
//                 // navigate('/login');
//             } else {
//                 // Password reset failed
//                 setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
//             }
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
//         }
//     };

//     return (
//         <div>
//             <h1>Password Reset Page</h1>
//             <label>Email:</label>
//             <span>{email}</span>
//             <br />
//             <label>New Password:</label>
//             <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleResetPassword}>Reset Password</button>

//             {resetStatus && (
//                 <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
//                     {resetStatus.message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const { token } = useParams();
//     const [newPassword, setNewPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [resetStatus, setResetStatus] = useState(null);
//     const navigate = useNavigate();
//     const apiUrl = `http://localhost:5173/api/reset-password/${token}`;
//     console.log('API URL:', apiUrl);

//     useEffect(() => {
//         // Fetch the email associated with the token
//         const fetchEmail = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5173/api/reset-password-info/${token}`);
//                 if (!response.ok) {
//                     throw new Error(`Error fetching email: ${response.statusText}`);
//                 }

//                 const data = await response.json();
//                 setEmail(data.email);
//             } catch (error) {
//                 // Handle error more gracefully
//                 console.error('Error fetching email:', error.message);
//             }
//         };

//         fetchEmail();
//     }, [token]);

//     const handleResetPassword = async () => {
//         console.log('Resetting password with newPassword:', newPassword, 'email:', email, 'and token:', token);

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     newPassword,
//                     email,
//                 }),
//             });

//             if (response.ok) {
//                 // Password reset successful
//                 setResetStatus({ success: true, message: 'Password reset successful!' });
//                 // You can navigate the user to the login page or any other page
//                 // navigate('/login');
//             } else {
//                 // Password reset failed
//                 setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
//             }
//         } catch (error) {
//             // Handle error more gracefully
//             console.error('Error resetting password:', error.message);
//             setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
//         }
//     };

//     return (
//         <div>
//             <h1>Password Reset Page</h1>
//             <label>Email:</label>
//             <span>{email}</span>
//             <br />
//             <label>New Password:</label>
//             <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleResetPassword}>Reset Password</button>

//             {resetStatus && (
//                 <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
//                     {resetStatus.message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const { token } = useParams();
//     const [newPassword, setNewPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [resetStatus, setResetStatus] = useState(null);
//     const navigate = useNavigate();
//     const apiUrl = `http://localhost:5173/api/reset-password/${token}`;

//     useEffect(() => {
//         // Fetch the email associated with the token
//         const fetchEmail = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5173/api/reset-password-info/${token}`);
//                 if (!response.ok) {
//                     throw new Error(`Error fetching email: ${response.statusText}`);
//                 }
        
//                 const data = await response.json();
//                 setEmail(data.email);
//             } catch (error) {
//                 // Handle error more gracefully
//                 console.error('Error fetching email:', error.message);
//             }
//         };
        

//         fetchEmail();
//     }, [token]);

//     const handleResetPassword = async () => {
//         console.log('Resetting password with newPassword:', newPassword, 'email:', email, 'and token:', token);

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     newPassword,
//                     email,
//                 }),
//             });

//             if (response.ok) {
//                 // Password reset successful
//                 setResetStatus({ success: true, message: 'Password reset successful!' });

//                 // Now update the password in the database
//                 const updatePasswordResponse = await fetch('http://localhost:5173/api/update-password', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email,
//                         newPassword,
//                     }),
//                 });

//                 if (updatePasswordResponse.ok) {
//                     console.log('Password updated in the database.');
//                 } else {
//                     console.error('Error updating password in the database.');
//                 }

//                 // You can navigate the user to the login page or any other page
//                 // navigate('/login');
//             } else {
//                 // Password reset failed
//                 setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
//             }
//         } catch (error) {
//             // Handle error more gracefully
//             console.error('Error resetting password:', error.message);
//             setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
//         }
//     };

//     return (
//         <div>
//             <h1>Password Reset Page</h1>
//             <label>Email:</label>
//             <span>{email}</span>
//             <br />
//             <label>New Password:</label>
//             <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleResetPassword}>Reset Password</button>

//             {resetStatus && (
//                 <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
//                     {resetStatus.message}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPage;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [resetStatus, setResetStatus] = useState(null);
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        console.log('Resetting password with newPassword:', newPassword, 'and token:', token);

        try {
            console.log("Token before fetch:", token);
            const response = await fetch(`http://localhost:5173/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword,
                    email: '', // You can pass an empty email or remove it if not needed
                }),
            });

            if (response.ok) {
                // Password reset successful
                setResetStatus({ success: true, message: 'Password reset successful!' });
                // You can navigate the user to the login page or any other page
                // navigate('/login');
            } else {
                // Password reset failed
                setResetStatus({ success: false, message: 'Password reset failed. Please try again.' });
            }
        } catch (error) {
            // Handle error more gracefully
            console.error('Error resetting password:', error.message);
            setResetStatus({ success: false, message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div>
            <h1>Password Reset Page</h1>
            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <button onClick={handleResetPassword}>Reset Password</button>

            {resetStatus && (
                <div style={{ marginTop: '10px', color: resetStatus.success ? 'green' : 'red' }}>
                    {resetStatus.message}
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;


