import { useState } from "react";
import AllCharts from "../components/AllCharts";
import Sidebar from "../components/Sidebar";
import DropdownComponent from "../components/BarChart/Yearwise";
import * as data from "../data/data.json";
import StateWise from "../components/BarChart/StateWise";
import CityWise from "../components/BarChart/CityWise";
import WithoutState from "../components/BarChart/WithoutState";
import Mymap from "../components/BarChart/Demographic/components/Mymap";

import "../styles/Charts.css";
import PieChartComponent from "../components/PieChartComponent";
import RankBarChartComponent from "../components/RankBarChartComponent";

const Charts = () => {
  const [charts, setCharts] = useState(
    <DropdownComponent data={data.default} />
  );

  const showStatewise = () => {
    setCharts(<StateWise data={data.default} />);
  };
  const showYearwise = () => {
    setCharts(<DropdownComponent data={data.default} />);
  };
  const showCitywiseForState = () => {
    setCharts(<CityWise data={data.default} />);
  };
  const showCitywise = () => {
    setCharts(<WithoutState data={data.default} />);
  };
  const showDemographic = () => {
    setCharts(<Mymap />);
  };
  const showPieChart = () => {
    setCharts(<PieChartComponent data={data.default} />);
  };
  const showRankBarChart = () => {
    setCharts(<RankBarChartComponent data={data.default} />);
  };
  return (
    <div style={{ display: "flex", height: "100%", overflowX: "hidden" }}>
      <Sidebar
        showStatewise={showStatewise}
        showYearwise={showYearwise}
        showCitywiseForState={showCitywiseForState}
        showCitywise={showCitywise}
        showDemographic={showDemographic}
        showPieChart={showPieChart}
        showRankBarChart={showRankBarChart}
      />
      <AllCharts charts={charts} />
    </div>
  );
};

export default Charts;
