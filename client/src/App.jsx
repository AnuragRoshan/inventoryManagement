import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/navbar";
import Home from "./Page/Home/Home";
import Employee from "./Page/Employee/employee";
import History from "./Page/History/history";
import Reports from "./Page/Reports/reports";
import Department from "./Page/Department/department";
import Inventory from "./Page/Inventory/inventory";
import AddEmployee from "./component/Employee/AddEmployee";
import Login from "./Page/Auth/Login";
import axios from "axios";

function App() {
  const [user, setUser] = useState(false);
  const getData = async () => {
    try {
      const apiUrl = `http://localhost:5000/getUser`;

      const { data } = await axios.get(apiUrl, { withCredentials: true });
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures that it runs only once when mounted

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route
            exact
            path="/employee"
            element={user ? <Employee /> : <Login />}
          />
          <Route
            exact
            path="/employee/addEmployee"
            element={user ? <AddEmployee /> : <Login />}
          />
          <Route
            exact
            path="/reports"
            element={user ? <Reports /> : <Login />}
          />
          <Route
            exact
            path="/departments"
            element={user ? <Department user={user} /> : <Login />}
          />
          <Route
            exact
            path="/inventory"
            element={user ? <Inventory /> : <Login />}
          />
          <Route
            exact
            path="/history"
            element={user ? <History /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
