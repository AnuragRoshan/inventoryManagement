import React from "react";
import "./navbar.css";
import NavItems from "./navItems";
import NavSearch from "./navsearch";

const navbar = ({ user }) => {
  return (
    <div>
      {user ? (
        <>
          <NavSearch user={user} />
          <NavItems />
        </>
      ) : (
        <>
          <NavSearch user={user} />
        </>
      )}
    </div>
  );
};

export default navbar;
