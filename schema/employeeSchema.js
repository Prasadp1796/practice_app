const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

const employeeSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    ContactNumber: {type: String, unique: "Employee With Contact Number Already Exist"},
    EmailID: {type: String, unique: "Employee With Email ID Already Exist"},
    IsDeleted: {type: Boolean, default: false}
}, {_id: false});

//Validate Data
employeeSchema.plugin(validator);

//Add Auto Increment To Event ID
employeeSchema.plugin(AutoIncrement, {
    modelName: 'employees',
    type: Number,
    unique: true,
    fieldName: '_id'
});


module.exports = mongoose.model('employees', employeeSchema);
