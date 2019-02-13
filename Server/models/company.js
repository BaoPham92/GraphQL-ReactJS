const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    fieldOfBusiness: String,
    employerId: String
})

module.exports = mongoose.model('Company', companySchema);