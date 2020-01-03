const router = require('express').Router();

const employeeSchema = require('../schema/employeeSchema');
//Method To Render Manage Employees Page
router.get('/manageEmployees', function (req, res) {
    res.render("ManageEmployees/index");
});

//MEthod To Add New Employees
router.post('/createEmployee', function (req, res) {
    let newEmployee = new employeeSchema(req.body);
    newEmployee.save(function (err) {
        if (err) {
            if (err.name == 'ValidationError') {
                var errorMessages = err.message.replace("employees validation failed:", "");
                console.log(errorMessages)
                errorMessages = errorMessages.split(',');
                console.log(errorMessages)
                for (var i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                // errorMessages = errorMessages.join(',');
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(201);
        }
    })
});

//Method To Get Employees List
router.get('/getEmployeesList', function (req, res) {
    employeeSchema.find({IsDeleted: false}, function (err, employeesList) {
        if (err)
            res.sendStatus(500);
        else
            res.send(employeesList);
    })
});

//Method To Delete Employee
router.get('/deleteEmployee', function(req, res){
    console.log(req.query)
    employeeSchema.findOneAndUpdate({EmployeeID: parseInt(req.query.EmployeeID)}, {$set: {IsDeleted: true}}, function(err){
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    })
});

//Method To Update Employees Details
router.post('/editEmployee', function(req, res){
    employeeSchema.findOneAndUpdate({EmployeeID: req.body.EmployeeID}, {$set: req.body},  {
        runValidators: true,
        context: 'query'
    },function(err){
        if (err) {
            console.log(err)
            if (err.name == 'ValidationError') {
                var errorMessages = err.message.replace("Validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (var i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        } else
            res.sendStatus(201);
    })
});
module.exports = router;