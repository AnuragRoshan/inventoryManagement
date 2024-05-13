const router = require("express").Router();


const employeeController = require("../controller/empAPI");
// const bookController = require("../controller/bookAPI");


// employee api
router.post("/addEmp", employeeController.createEmployee);




module.exports = router;