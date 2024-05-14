const employeeSchema = require('../models/employee');
const History = require('../models/recomDone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new Employee




exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await employeeSchema.findOne({ username });
        const passCheck = await bcrypt.compare(password, user.password)

        if (user && passCheck) {
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                "jwtsecret",
                { expiresIn: "1h" },
            )
            user.token = token;
            user.password = undefined;

            //cookie section
            const options = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
                ),
                httpOnly: true,
            };
            res.status(200).cookie("jwt", token, options).json({ msg: 'User Logged In Successfully', token, user });
        } else {
            res.status(201).json({ msg: "Invalid Creds" })
        }

    } catch (error) {
        console.log(error);
    }
};


exports.getUser = async (req, res, next) => {
    // console.log(req.user);
    let user
    if (req.user) {
        // console.log(req.user);
        user = await employeeSchema.findOne({ username: req.user.username });
    }
    res.send(user);

};

exports.logout = async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({ msg: "User Logged Out" });
};


exports.createEmployee = async (req, res) => {

    console.log(req.body);

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    const data = await employeeSchema.findOne().countDocuments();
    // return res.json({ message: data });
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    let empID = "EMP" + data + req.body.department.slice(0, 2).toUpperCase() + req.body.role.slice(0, 2).toUpperCase();

    // return res.json({ message: req.body });
    // Create a Employee
    const employee = new employeeSchema({
        employeeID: empID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.emailAddress,
        password: hashedPassword,
        role: req.body.role,
        department: req.body.department,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        joiningDate: Date.now(),
        salary: req.body.salary
    });

    // Save Employee in the database
    employee.save()
        .then(data => {
            res.status(200).send({
                message: "Employee added successfully"
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};



exports.getEmployeeList = async (req, res) => {

    const data = await employeeSchema.find();
    res.send(data);
};

exports.getEmployeeData = async (req, res) => {
    try {
        // Get the total number of employees
        const totalEmployeeCount = await employeeSchema.countDocuments();

        // Calculate the total salary spent
        const totalSalarySpentResult = await employeeSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalarySpent: { $sum: "$salary" }
                }
            }
        ]);
        const totalSalarySpent = totalSalarySpentResult.length > 0 ? totalSalarySpentResult[0].totalSalarySpent : 0;

        // Calculate the average salary
        const averageSalaryResult = await employeeSchema.aggregate([
            {
                $group: {
                    _id: null,
                    averageSalary: { $avg: "$salary" }
                }
            }
        ]);
        const averageSalary = averageSalaryResult.length > 0 ? averageSalaryResult[0].averageSalary : 0;

        // Calculate the number of employees joined in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        console.log("Seven days ago:", sevenDaysAgo);

        const joinersLastSevenDaysCount = await employeeSchema.countDocuments({ joiningDate: { $gte: sevenDaysAgo } });
        console.log("Joiners in the last 7 days count:", joinersLastSevenDaysCount);
        // Send the response with the calculated data
        res.status(200).json({
            totalEmployeeCount,
            totalSalarySpent,
            averageSalary,
            joinersLastSevenDaysCount
        });
    } catch (error) {
        console.error("Error in getEmployeeData:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.saveRecom = async (req, res) => {
    const { recomName, recomDepart, recomEmpName, recomEmpDepart } = req.body;

    if (!recomName || !recomDepart || !recomEmpName || !recomEmpDepart) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newHistory = new History({
        recomName,
        recomDepart,
        recomEmpName,
        recomEmpDepart,
    });

    try {
        const savedHistory = await newHistory.save();
        res.status(201).json(savedHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save history record' });
    }


}