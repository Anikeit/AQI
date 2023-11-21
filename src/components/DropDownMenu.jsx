import DropdownComponent from "./BarChart/DropDownComponent";
import * as data from "../data/data.json";
import StateWise from "./BarChart/StateWise";
import CityWise from "./BarChart/CityWise";
import WithoutState from "./BarChart/WithoutState";
import "../styles/Chart.css";
const DropDownMenu = () => {
  return (
    <div className="Charts">
      <DropdownComponent data={data.default} />
      <StateWise data={data.default} />
      <CityWise data={data.default} />
      <WithoutState data={data.default} />
    </div>
  );
};

export default DropDownMenu;
