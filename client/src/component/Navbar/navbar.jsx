import React from "react";
import "./navbar.css";
import NavItems from "./navItems";
import NavSearch from "./navsearch";

const navbar = () => {
  return (
    <div>
      <NavSearch />
      <NavItems />
    </div>
  );
};

export default navbar;
