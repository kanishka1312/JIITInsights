const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})


const reminderModel = mongoose.model('Reminder', reminderSchema);
module.exports = reminderModel; 