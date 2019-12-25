const express = require('express');
const router = express.Router();

//Users Schema Imported Here
const userSchema = require('../schema/users.schema');

//Method To Render Manage Users Page [2. Read Operation]
router.get('/manageUsers', function (req, res) {
    userSchema.find(function (err, users) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.render('ManageUsers/index', {users: users, title: "Manage Users"});
    })

});

//_________________________________________________________1. Create New User___________________________________________
//i. Method To Render Create User Page
router.get('/createUser', function (req, res) {
    res.render('ManageUsers/addUser');
});

//ii.Method To Save User Details
router.post('/createUser', function (req, res) {
    let newUser = new userSchema(req.body);
    newUser.save(function (err) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect('/manageUsers')
    })
});

//______________________________________________________ 2. Update User Details
//i. Method To Render Update User Details Page
router.route('/editUser').get(function (req, res) {
    userSchema.findOne({_id: req.query._id}, function (err, user) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.render("ManageUsers/editUser", {user: user});
    });
}).post(function (req, res) {
    userSchema.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, function (err) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect('/manageUsers');
    })
});


//4. Method To Delete User
router.get('/deleteUser', function (req, res) {
    console.log(req.query)
    userSchema.findOneAndRemove({_id: req.query._id}, function (err) {
        if (err)
            res.render('error', {error: {status: 500, stack: err}, message: err.message});
        else
            res.redirect('/manageUsers');
    })
});

module.exports = router;
