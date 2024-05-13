import React from "react";
import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <>
      <Link to="/employee/addEmployee">
        <div className="button-top">Add New Employee</div>
      </Link>
    </>
  );
};

export default AddButton;
