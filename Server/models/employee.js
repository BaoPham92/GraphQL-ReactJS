const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    skillType: String,
    gender: String,
    age: Number
})

module.exports = mongoose.model('Employee', employeeSchema);

