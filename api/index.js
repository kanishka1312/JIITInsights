
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Hosted = require("./models/Hosted");
const Participated = require("./models/Participated");
const Reminder = require("./models/Reminder");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const EventEmitter = require('events');
// Set the appropriate number based on your application

// ... rest of your code



require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'bksdfb2h832h8932';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);



EventEmitter.defaultMaxListeners = 15; 
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
}

app.get("/test", (req, res) => {
    res.json("test ok");
});





app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            role: 'user', // Set role to 'user' for regular user registration
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});



// Login route for regular users
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email: email, role: 'user' });

        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);

            if (passOk) {
                jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id,
                    role: userDoc.role  // Add role to the token payload
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            } else {
                res.status(422).json('Password is incorrect');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If the user is not found, return an error
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Save the reset token and its expiration time in the user's document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in one hour
        await user.save();

        // Create a nodemailer transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_EMAIL, // Your Gmail email address
                pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
            },
        });

        // Create the email content
        const mailOptions = {
            from: "jiitinsights2023@gmail.com", // Sender email address
            to: user.email, // Recipient email address
            subject: "Password Reset",
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Error sending reset email:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // If the email is sent successfully, respond with a success message
            res.json({ success: true, message: "Password reset email sent" });
        });
    } catch (error) {
        console.error("Error handling forgot password request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/user-role/:email', (req, res) => {
    const { email } = req.params;
    const user = users.find((user) => user.email === email);
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json({ role: user.role });
  });
  
  // Route for updating password
  app.post('/update-password', async (req, res) => {
    try {
      const { email, password, userRole } = req.body;
  
      // Retrieve user from the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check user role and update password based on the role
      if (user.role === 'admin') {
        if (userRole === 'adminPassword') {
          // Update admin password logic
          user.adminPassword = password;
        } else {
          return res.status(400).json({ error: 'Invalid user role for admin' });
        }
      } else if (user.role === 'user') {
        if (userRole === 'password') {
          // Update user password logic
          user.password = password;
        } else {
          return res.status(400).json({ error: 'Invalid user role for user' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid user role' });
      }
  
      // Save the updated password
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


// Route for handling password reset
// Route for handling password reset
// app.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { newPassword, email } = req.body;

//     try {
//         // Find the user by email and token
//         const user = await User.findOne({ email, resetPasswordToken: token });  // Update field name to resetPasswordToken

//         if (!user) {
//             return res.status(404).json({ message: 'User not found or invalid token' });
//         }

//         // Update the password based on the role
//         if (user.role === 'admin') {
//             user.adminPassword = newPassword;
//         } else {
//             user.password = newPassword;
//         }

//         // Clear the reset token
//         user.resetPasswordToken = null;  // Update field name to resetPasswordToken
//         user.resetPasswordExpires = null;  // Update field name to resetPasswordExpires

//         await user.save();

//         res.status(200).json({ message: 'Password reset successful' });
//     } catch (error) {
//         console.error('Error resetting password:', error.message);
//         res.status(500).json({ message: 'An error occurred. Please try again later.' });
//     }
// });

// app.get('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid or expired reset token' });
//         }

//         // If the user is valid, you might want to redirect or render the reset page on the client side
//         // Here, I'm sending a JSON response with a success message
//         res.json({ success: true, message: 'Valid reset token' });
//     } catch (error) {
//         console.error('Error handling reset password request:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Uncomment the following if needed for handling the reset-password POST request
// app.post('/api/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { newPassword, email } = req.body; // Include email in the request body

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//             email: email, // Check for both token and email
//         });

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid or expired reset token or email' });
//         }

//         // Update the user's or admin's password based on the role
//         if (user.role === 'admin') {
//             user.adminPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
//         } else {
//             user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
//         }

//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         // Send a success response
//         res.json({ success: true, message: 'Password reset successful' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// // Endpoint to update password in the database
// app.post('/api/update-password', async (req, res) => {
//     const { email, newPassword } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user's or admin's password based on the role
//         if (user.role === 'admin') {
//             user.adminPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
//         } else {
//             user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
//         }

//         await user.save();

//         // Send a success response
//         res.json({ success: true, message: 'Password updated successfully' });
//     } catch (error) {
//         console.error('Error updating password:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/profile', async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const user = await User.findById(userData.id);

            if (user) {
                const { _id, role, userName, name, email } = user;

                if (role === 'admin' && userName) {
                    return res.json({ _id, role, userName });
                } else if (role === 'user' && name && email) {
                    return res.json({ _id, role, name, email });
                } else {
                    return res.status(404).json("Invalid User");
                }
            } else {
                return res.status(404).json("User not found");
            }
        });
    } else {
        res.json(null);
    }
});



function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        try {
            // You may not need to find the user by ID for logout
            // Just attach the decoded user information to the request object
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}




app.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Clear the token in the cookie
        res.cookie('token', '').json(true);
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    var uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/account/hosted', async (req, res) => {
    const { token } = req.cookies;
    const {
        title, venue, addedPhotos, description,
        perks, extraInfo, time, date
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const Hosteddoc = await Hosted.create({
            owner: userData.id,
            title, venue, photos: addedPhotos, description,
            perks, extraInfo, time, date
        });
        res.json(Hosteddoc);
    });
});

app.get('/account/hosted', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = userData;
        res.json(await Hosted.find({ owner: id }));
    });
});


app.get('/hosted/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Hosted.findById(id));
});

app.put('/account/hosted', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, venue, addedPhotos, description,
        perks, extraInfo, time, date
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const hostDoc = await Hosted.findById(id);
        if (userData.id === hostDoc.owner.toString()) {
            hostDoc.set({
                title, venue, photos: addedPhotos, description,
                perks, extraInfo, time, date
            });
            await hostDoc.save();
            res.json('ok');
        }
    });
});

app.get('/user-hosted', async (req, res) => {
    try {
        const hostedEvents = await Hosted.find();
        res.json(hostedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});




app.get('/participated/:id', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    try {
        const participation = await Participated.findOne({ _id: req.params.id, user: userData.id }).populate('host');
        if (!participation) {
            return res.status(404).json({ error: 'Participation not found' });
        }
        res.json(participation);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching participation data.' });
    }
});


app.get('/participated', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    try {
        // Fetch all participations for the user
        const participations = await Participated.find({ user: userData.id }).populate('host');
        
        res.json(participations);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching participation data.' });
    }
});



app.post('/participated', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        host, name, whatsappNo
    } = req.body;
    Participated.create({
        host,
        name,
        whatsappNo,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while creating the document.' });
    });
});

app.get("/getAllReminder", (req, res) => {
    Reminder.find({})
        .then(reminderList => {
            res.send(reminderList);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("An error occurred while fetching reminders.");
        });
});


const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' });

        if (admins) {
            return res.status(200).json({
                code: 200,
                message: 'Success',
                data: admins
            });
        } else {
            return res.status(500).json({
                code: 500,
                message: 'Service error'
            });
        }
    } catch (error) {
        console.error('Error in getAdmins:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
        });
    }
};






const addAdmins = async (req, res) => {
    try {
        const { userName, adminPassword, email } = req.body;

        // Check if an admin with the given username or email already exists
        const existingAdmin = await User.findOne({ $or: [{ userName, role: 'admin' }, { email, role: 'admin' }] });
        if (existingAdmin) {
            return res.status(409).json({ code: 409, message: 'Admin already exists' });
        }

        // Create a new admin with the provided details
        const newAdmin = await User.create({
            userName,
            adminPassword: bcrypt.hashSync(adminPassword, bcrypt.genSaltSync(10)),
            role: 'admin',
            email,
        });

        if (newAdmin) {
            return res.status(200).json({ code: 200, message: 'Admin created successfully' });
        } else {
            return res.status(500).json({ code: 500, message: 'Service error' });
        }
    } catch (error) {
        console.error('Error in addAdmins:', error);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

app.post('/admin/add', async (req, res) => {
    try {
        const { userName, adminPassword, email, role } = req.body;

        // Check if the role is 'admin'
        if (role === 'admin') {
            // Create a new admin instance with the necessary fields
            const newAdmin = new User({ userName, email, role });

            // Hash the adminPassword before storing it in the database
            newAdmin.adminPassword = bcrypt.hashSync(adminPassword, bcryptSalt);

            // Save the new admin to the database
            await newAdmin.save();

            // Respond with success
            res.json({ success: true });
        } else {
            // If the role is not 'admin', return an error
            res.status(400).json({ success: false, message: 'Invalid role for admin' });
        }
    } catch (error) {
        console.error('Error saving admin to the database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// const authenticateAdminMiddleware = async (req, res, next) => {
//     const { userName, adminPassword } = req.body;

//     try {
//         const adminUser = await User.findOne({ userName: userName, role: 'admin' });

//         if (adminUser) {
//             const passwordMatch = bcrypt.compareSync(adminPassword, adminUser.adminPassword);

//             if (passwordMatch) {
//                 // If authentication is successful, attach the admin user to the request object
//                 req.adminUser = adminUser;
//                 next();
//             } else {
//                 console.log('Admin Password incorrect.');
//                 return res.status(401).json({
//                     code: 401,
//                     message: 'Username or Admin Password wrong.'
//                 });
//             }
//         } else {
//             console.log('Admin not found.');
//             return res.status(404).json({
//                 code: 404,
//                 message: 'Admin not found'
//             });
//         }
//     } catch (error) {
//         console.error('Error in admin authentication:', error);
//         return res.status(500).json({
//             code: 500,
//             message: 'Internal Server Error'
//         });
//     }
// };

// // Use the middleware in the route handlers
// app.post('/admin/add', authenticateAdminMiddleware, async (req, res) => {
//     // Only authenticated admin can access this route
//     try {
//         // Access admin user information using req.adminUser
//         const { userName, adminPassword, email, role } = req.body;

//         // Check if the role is 'admin'
//         if (role === 'admin') {
//             // Create a new admin instance with the necessary fields
//             const newAdmin = new User({ userName, email, role });

//             // Hash the adminPassword before storing it in the database
//             newAdmin.adminPassword = bcrypt.hashSync(adminPassword, bcryptSalt);

//             // Save the new admin to the database
//             await newAdmin.save();

//             // Respond with success
//             res.json({ success: true });
//         } else {
//             // If the role is not 'admin', return an error
//             res.status(400).json({ success: false, message: 'Invalid role for admin' });
//         }
//     } catch (error) {
//         console.error('Error saving admin to the database:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// app.get('/admin/admins', authenticateAdminMiddleware, getAdmins);


// Login route for admin users
app.post('/admin/login', async (req, res) => {
    const { userName, adminPassword } = req.body;

    try {
        const adminUser = await User.findOne({ userName: userName, role: 'admin' });

        if (adminUser) {
            const passwordMatch = bcrypt.compareSync(adminPassword, adminUser.adminPassword);

            if (passwordMatch) {
                const token = jwt.sign({
                    userName: adminUser.userName,
                    id: adminUser._id,
                    role: adminUser.role,
                    isAdmin: true  // Add isAdmin to the token payload
                }, jwtSecret);

                console.log('Admin Login success. Token:', token);

                return res.status(200).cookie('token', token).json({
                    code: 200,
                    message: 'Login success',
                    token: token,
                    role: adminUser.role
                });
            } else {
                console.log('Admin Password incorrect.');
                return res.status(401).json({
                    code: 401,
                    message: 'Username or Admin Password wrong.'
                });
            }
        } else {
            console.log('Admin not found.');
            return res.status(404).json({
                code: 404,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        console.error('Error in admin login:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
        });
    }
});


// Middleware to verify the token on each request
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({
            code: 403,
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                code: 401,
                message: 'Invalid token'
            });
        }

        req.decoded = decoded;
        next();
    });
};

app.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body;
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    });
    reminder.save()
        .then(savedReminder => {
            // Successfully saved, handle the response here
            Reminder.find({})
                .then(reminderList => {
                    res.send(reminderList);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});


let globalWhatsappNumber = ''; 

app.get('/getWhatsappNumber', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    if (!userData) {
      console.error('Unauthorized: No user data.');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = userData.id;
    console.log('User ID:', userId);

    const participation = await Participated.findOne({ user: userId }).exec();

    if (participation) {
      globalWhatsappNumber = participation.whatsappNo; // Update the globally stored WhatsApp number
      console.log('WhatsApp Number:', globalWhatsappNumber);
      res.json({ whatsappNumber: globalWhatsappNumber });
    } else {
      console.error('User not found or WhatsApp number not available for user ID:', userId);
      res.status(404).json({ error: 'User not found or WhatsApp number not available.' });
    }
  } catch (error) {
    console.error('Error fetching WhatsApp number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// setInterval(async () => {
//     try {
//       // Use the globally stored WhatsApp number
//       const toNumber = `whatsapp:+${globalWhatsappNumber}`;
  
//       console.log('To Number:', toNumber); // Log the constructed toNumber for debugging
  
//       const reminderList = await Reminder.find({ isReminded: false });
//       reminderList.forEach(async (reminder) => {
//         const now = new Date();
//         if ((new Date(reminder.remindAt) - now) < 0) {
//           await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });
//           const accountSid = process.env.ACCOUNT_SID;
//           const authToken = process.env.AUTH_TOKEN;
//           const client = require('twilio')(accountSid, authToken);
  
//           client.messages
//             .create({
//               body: reminder.reminderMsg,
//               from: 'whatsapp:+14155238886',
//               to: `whatsapp:+91${globalWhatsappNumber}`
//             })
//             .then(message => {
//               console.log(message.sid);
//             })
//             .catch(error => {
//               console.error('Twilio error:', error);
//             });
//         }
//       });
//     } catch (error) {
//       console.error('Error processing reminders:', error);
//     }
//   }, 5000);
  
// setInterval(async () => {
//     try {
//       console.log('Executing the interval function...');
  
//       // Use the globally stored WhatsApp number
//       const toNumber = `whatsapp:+${globalWhatsappNumber}`;
//       console.log('To Number:', toNumber);
  
//       // Retrieve reminders from the database
//       const reminderList = await Reminder.find({ isReminded: false });
//       console.log('Reminder List:', reminderList);
  
//       for (const reminder of reminderList) {
//         const now = new Date();
//         console.log('Reminder Date:', reminder.remindAt);
//         console.log('Current Date:', now);
  
//         if ((new Date(reminder.remindAt) - now) < 0) {
//           // Update isReminded flag
//           const updateResult = await Reminder.findByIdAndUpdate(reminder._id, { isReminded: tmongoose.rusted });
//           console.log('Update Result:', updateResult);
  
//           // Send WhatsApp message
//           const accountSid = process.env.ACCOUNT_SID;
//           const authToken = process.env.AUTH_TOKEN;
//           const client = require('twilio')(accountSid, authToken);
  
//           try {
//             console.log('Sending Twilio message...');
//             const message = await client.messages.create({
//               body: reminder.reminderMsg,
//               from: 'whatsapp:+14155238886',
//               to: `whatsapp:+91${globalWhatsappNumber}`
//             });
  
//             console.log('Twilio SMS ID:', message.sid);
//           } catch (error) {
//             console.error('Twilio error:', error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error in the interval function:', error);
//     }
//   }, 5000);
  
// let globalWhatsappNumber = ''; 

// app.get('/getWhatsappNumber', async (req, res) => {
//   try {
//     const userData = await getUserDataFromReq(req);

//     if (!userData) {
//       console.error('Unauthorized: No user data.');
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const userId = userData.id;
//     console.log('User ID:', userId);

//     const participation = await Participated.findOne({ user: userId }).exec();

//     if (participation) {
//       globalWhatsappNumber = participation.whatsappNo; // Update the globally stored WhatsApp number
//       console.log('WhatsApp Number:', globalWhatsappNumber);
//       res.json({ whatsappNumber: globalWhatsappNumber });
//     } else {
//       console.error('User not found or WhatsApp number not available for user ID:', userId);
//       res.status(404).json({ error: 'User not found or WhatsApp number not available.' });
//     }
//   } catch (error) {
//     console.error('Error fetching WhatsApp number:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

setInterval(async () => {
    try {
      console.log('Executing the interval function...');
  
      // Use the globally stored WhatsApp number
      const toNumber = `whatsapp:+${globalWhatsappNumber}`;
      console.log('To Number:', toNumber);
  
      // Retrieve reminders from the database
      const reminderList = await Reminder.find({ isReminded: false });
      console.log('Reminder List:', reminderList);
  
      for (const reminder of reminderList) {
        const now = new Date();
        console.log('Reminder Date:', reminder.remindAt);
        console.log('Current Date:', now);
  
        if ((new Date(reminder.remindAt) - now) < 0) {
          // Update isReminded flag
          console.log('Updating Reminder:', reminder._id);
          const updateResult = await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true }, { new: true });
          console.log('Update Result:', updateResult);
  
          // Send WhatsApp message
          const accountSid = process.env.ACCOUNT_SID;
          const authToken = process.env.AUTH_TOKEN;
          const client = require('twilio')(accountSid, authToken);
  
          try {
            console.log('Sending Twilio message...');
            const message = await client.messages.create({
              body: reminder.reminderMsg,
              from: 'whatsapp:+14155238886',
              to: `whatsapp:+91${globalWhatsappNumber}`
            });
  
            console.log('Twilio SMS ID:', message.sid);
          } catch (error) {
            console.error('Twilio error:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error in the interval function:', error);
    }
  }, 5000);
  

app.delete('/deleteReminder/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReminder = await Reminder.findByIdAndDelete(id);
        if (!deletedReminder) {
            return res.status(404).send("Reminder not found");
        }
        const updatedReminderList = await Reminder.find({});
        res.json(updatedReminderList);
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/admin/admins", getAdmins);
app.post("/admin/add", addAdmins);

// app.post('/admin/login', adminController.loginAdmin)

app.listen(4000);

