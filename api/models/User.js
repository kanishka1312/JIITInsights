

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ['admin', 'user'], default: 'user' },
//     userName: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } },
//     adminPassword: { type: String, required: function () { return this.role === 'admin'; } }
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;


const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    userName: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } },
    adminPassword: { type: String, required: function () { return this.role === 'admin'; } },
    resetPasswordToken: String,  // Update field name to resetPasswordToken
    resetPasswordExpires: Date,  // Update field name to resetPasswordExpires
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
