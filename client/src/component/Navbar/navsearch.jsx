import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavSearch = ({ user }) => {
  const [gearRotated, setGearRotated] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/logout`, null, {
        withCredentials: true, // include cookies in the request
      });

      if (response.status === 200) {
        // Logout successful
        console.log("User logged out");
        window.location.href = "/";
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="nav-search-top">
      <div>
        <i className="fa-brands fa-buysellads"></i>{" "}
      </div>
      <div>ALOTHAIM</div>
      {user ? (
        <>
          <div className="input-search">
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="text" placeholder="Search Here...." />
          </div>
          <div>
            <i class="fa-solid fa-user-shield"></i>
          </div>

          <div onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>
        </>
      ) : (
        <>
          <Link to="/login">
            <div>
              <i class="fa-solid fa-user-shield"></i>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavSearch;
