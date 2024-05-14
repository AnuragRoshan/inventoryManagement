const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv")
const routes = require("./api/routes/index")
const cookieParser = require('cookie-parser');
// const router = require("express").Router();
app.use(morgan("dev"));


dotenv.config();


//database connection
require("./db_connection");


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(cookieParser())


//Middleware End

//Route

app.use(routes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server Is Connected to Port " + PORT);
})