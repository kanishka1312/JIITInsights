const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participatedSchema = new Schema({
    host: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Hosted'},
    user: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: { type: String, required: true },
    whatsappNo: { type: String, required: true },
});

const participatedModel = mongoose.model('Participated', participatedSchema);
module.exports = participatedModel; 