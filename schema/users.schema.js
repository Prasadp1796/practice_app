const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    ContactNumber: {type: String, unique: true},
    EmailID: {type: String, unique: true}
}, {_id: false});

//Validate Data
userSchema.plugin(validator);

//Add Auto Increment To Event ID
userSchema.plugin(AutoIncrement, {
    modelName: 'users',
    type: Number,
    unique: true,
    fieldName: '_id'
});


module.exports = mongoose.model('users', userSchema);
