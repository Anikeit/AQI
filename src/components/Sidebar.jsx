import { useState } from "react";
import "../styles/Sidebar.css";
import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({
  // eslint-disable-next-line react/prop-types
  showStatewise,
  // eslint-disable-next-line react/prop-types
  showYearwise,
  // eslint-disable-next-line react/prop-types
  showCitywiseForState,
  // eslint-disable-next-line react/prop-types
  showCitywise,
  // eslint-disable-next-line react/prop-types
  showDemographic,
}) => {
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState("yearwise"); // Default to "Year Wise Comparison"

  const toggleHidden = () => {
    setActive(!active);
  };

  const onItemClick = (item) => {
    setSelectedItem(item);
    toggleHidden();
  };

  return (
    <div className="sidebar-container">
      <div className="hamburger" onClick={toggleHidden}>
        <img
          className="menu-icon"
          src={`${active ? "/cross.svg" : "/hamburger.svg"}`}
          alt="ham"
        />
      </div>
      <div></div>
      <nav className={`sidebar ${active ? "" : "hidden"}`}>
        <div className="sidebar-label">
          <Lightbulb />
          Visualizations
        </div>

        <div
          className={`sidebar-item ${
            selectedItem === "yearwise" ? "selected" : ""
          }`}
          onClick={() => {
            onItemClick("yearwise");
            showYearwise();
          }}
        >
          Year Wise Comparison
        </div>
        <div
          className={`sidebar-item ${
            selectedItem === "statewise" ? "selected" : ""
          }`}
          onClick={() => {
            onItemClick("statewise");
            showStatewise();
          }}
        >
          Statewise Comparison
        </div>
        <div
          className={`sidebar-item ${
            selectedItem === "citywiseForState" ? "selected" : ""
          }`}
          onClick={() => {
            onItemClick("citywiseForState");
            showCitywiseForState();
          }}
        >
          Citywise Comparison for Each State
        </div>
        <div
          className={`sidebar-item ${
            selectedItem === "citywise" ? "selected" : ""
          }`}
          onClick={() => {
            onItemClick("citywise");
            showCitywise();
          }}
        >
          City Wise Comparison
        </div>
        <div
          className={`sidebar-item ${
            selectedItem === "demographic" ? "selected" : ""
          }`}
          onClick={() => {
            onItemClick("demographic");
            showDemographic();
          }}
        >
          Demographic Graph
        </div>
        <Link to="/" className="GoHome">
          Home
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
