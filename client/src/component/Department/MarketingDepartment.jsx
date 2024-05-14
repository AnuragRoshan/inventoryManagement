import React from "react";

const MarketingDepartment = ({ user, onDepartmentClick }) => {
  const handleClick = () => {
    onDepartmentClick({
      recomEmpName: `${user.firstName} ${user.lastName}`,
      recomEmpDepart: user.department,
      recomDepart: topCategoryForMonth,
      recomName: "Advertisement",
    });
  };
  // Get current date
  const currentDate = new Date();
  // Get current month (0-indexed)
  const currentMonthIndex = currentDate.getMonth();
  // Map month index to month name
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = months[currentMonthIndex];

  // Define sales trends
  const salesTrends = {
    January: "electronics",
    February: "grocery",
    March: "grocery",
    April: "furniture",
    May: "electronics",
    June: "furniture",
    July: "furniture",
    August: "grocery",
    September: "electronics",
    October: "electronics",
    November: "stationary",
    December: "stationary",
  };

  const interestedPeople = [
    "jonsnow@gmail.com",
    "emilly@yahoo.com",
    "anurag@gmail.com",
    "theo@rediffmail.com",
  ];

  // Get top-performing product category for current month
  const topCategoryForMonth = salesTrends[currentMonthName];

  return (
    <div className="marketing-department-head">
      <div className="sales-head">Marketing Department</div>
      <div className="sales-subhead" style={{ marginBlockStart: "0.5rem" }}>
        This section will suggest the marketing strategies to increase the sales
        of the company.
      </div>
      <div className="month-quotes">
        {`Next month `}
        <span style={{ color: "green" }}>{`${currentMonthName}`}</span>
        {` is good for sales in `}
        <span
          style={{ color: "#3811a3", fontSize: "2.8rem" }}
        >{`${topCategoryForMonth}`}</span>
        {`, so here are some suggestions to increase sales in this category`}
      </div>
      <div className="intreset-people">
        <span>From our data, we have found that </span>
        there are{" "}
        <span className="social" style={{ fontSize: "2rem" }}>
          {interestedPeople.length}
        </span>{" "}
        peoples interested in buying products from electronics category
      </div>
      <div className="intreset-people">
        and our{" "}
        <span style={{ color: "#3811a3", fontSize: "2.8rem" }}>
          {" "}
          Machine Learning{" "}
        </span>
        algorithm is suggesting that{" "}
      </div>
      <div className="send-advertisement">
        <div>By</div>
        <button onClick={handleClick} className="send-advertisement-button">
          Sending Advertisement
        </button>
        <div>
          to{" "}
          <span className="interestedPeople">
            {interestedPeople.slice(0, 2).join(", ")}
          </span>{" "}
          and {interestedPeople.length - 1} other people via{" "}
          <span className="social">SMS, Email, Instagram, Facebook </span> you
          can increase the sales by <span className="increase"> 150%</span>
        </div>
      </div>
    </div>
  );
};

export default MarketingDepartment;
