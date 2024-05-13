const employeeSchema = require('../models/employee');

// Create and Save a new Employee

exports.createEmployee = (req, res) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Create a Employee
    const employee = new employeeSchema({
        employeeID: req.body.employeeID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        role: req.body.role,
        department: req.body.department,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        joiningDate: req.body.joiningDate
    });

    // Save Employee in the database
    employee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};