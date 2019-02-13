const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    fieldOfBusiness: String,
    employerId: Number
})

module.exports = mongoose.model('Company', companySchema);