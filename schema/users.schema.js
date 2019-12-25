const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    ContactNumber: {type: String, unique: true},
    EmailID: {type: String, unique: true}
});

module.exports = mongoose.model('users', userSchema);
