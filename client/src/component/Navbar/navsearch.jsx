import React, { useState } from "react";

const NavSearch = () => {
  const [gearRotated, setGearRotated] = useState(false);

  const toggleGearRotation = () => {
    setGearRotated(!gearRotated);
  };

  return (
    <div className="nav-search-top">
      <div>
        <i className="fa-brands fa-buysellads"></i>{" "}
      </div>
      <div>ALOTHAIM</div>
      <div className="input-search">
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input type="text" placeholder="Search Here...." />
      </div>
      <div>
        <i class="fa-solid fa-user-shield"></i>
      </div>
      <div onClick={toggleGearRotation}>
        <i className={"fa-solid fa-gear" + (gearRotated ? " rotated" : "")}></i>
      </div>
    </div>
  );
};

export default NavSearch;
