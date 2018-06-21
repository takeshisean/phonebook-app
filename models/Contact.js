const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    number: String,
    createdAt: { type: Date, default: Date.now },
    phoneType: { type: Schema.Types.ObjectId, ref: 'PhoneType' }
});

mongoose.model('Contact', contactSchema);
module.exports = mongoose.model('Contact');