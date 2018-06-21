const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phoneTypeSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    type: String
});

mongoose.model('PhoneType', phoneTypeSchema);
module.exports = mongoose.model('PhoneType');
