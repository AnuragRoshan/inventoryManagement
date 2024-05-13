const mongoose = require("mongoose");

// Define the employee schema
const employeeSchema = mongoose.Schema(
    {
        employeeID: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        emailAddress: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        },
        password: { type: String, required: true },
        role: { type: String, required: true },
        department: { type: String, required: true },
        contactNumber: { type: String, required: true },
        address: { type: String },
        joiningDate: { type: Date, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
