const router = require("express").Router();


const employeeController = require("../controller/empAPI");
const salesController = require("../controller/salesAPI");
const inventoryController = require("../controller/inventoryAPI");
const auth = require("../middleware/auth");


// employee api
router.post("/addEmp", employeeController.createEmployee);
router.post("/login", employeeController.loginUser);
router.post("/logout", employeeController.logout);
router.get('/getUser', auth, employeeController.getUser);
router.post("/addEmp", employeeController.createEmployee);
router.post("/sales/last", salesController.getSales);
router.post("/orders/last24h", salesController.get24hOrders);
router.post("/salesUpdate", salesController.update);
router.post("/sales/perMonths", salesController.perMonthSales);
router.post("/inventory/detail", inventoryController.inventoryDetails);
router.post("/employee/list", employeeController.getEmployeeList);
router.post("/employee/data", employeeController.getEmployeeData);
router.post("/products/list", inventoryController.getAllProducts);
router.post("/saveRecom", employeeController.saveRecom);
// router.post("/orders/last", inventoryController.inventoryDetails);




module.exports = router;