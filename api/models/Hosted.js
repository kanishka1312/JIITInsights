// const mongoose = require('mongoose');

// const HostedSchema = new mongoose({
//     owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
//     title: String,
//     venue: String,
//     photos: [String], 
//     description: String,
//     perks: [String],
//     extraInfo: String,
//     dateofevent: String,
//     Time: String,
// });

// const HostedModel = mongoose.model('Host', HostedSchema);

// module.exports = HostedModel;



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostedSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    venue: String,
    photos: [String], 
    description: String,
    perks: [String],
    extraInfo: String,
    date: String,
    time: String,
});

const HostedModel = mongoose.model('Hosted', HostedSchema);
module.exports = HostedModel;
