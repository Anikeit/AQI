import { useEffect, useState } from "react";
import "../styles/Charts.css";
import "../styles/Chart.css";
import Select from "react-select";
import {
  calculateAQI_NO2,
  calculateAQI_PM10,
  calculateAQI_PM2,
  calculateAQI_SO2,
} from "./BarChart/AqiCalculator";
import ResponsiveRankChart from "./ResponsiveRankChart";

const RankBarChartComponent = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedElement, setSelectedElement] = useState("");
  const [sortByOrder, setSortByOrder] = useState("");
  const [chartData, setChartData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    setSelectedElement("");
    setSortByOrder("");
  };

  //   ["Low to High (Top 10)", "Low to High (Top 25)", "High to Low (Top 10)", "High to Low (Top 25)"]
  const handleSortChange = (selectedOption) => {
    setSortByOrder(selectedOption.value);
    let sortedArray;
    if (selectedOption.value === "Low to High (Top 10)") {
      sortedArray = [...chartData]
        .sort((a, b) => a.value - b.value)
        .slice(0, 10);
    } else if (selectedOption.value === "Low to High (Top 25)") {
      sortedArray = [...chartData]
        .sort((a, b) => a.value - b.value)
        .slice(0, 25);
    } else if (selectedOption.value === "High to Low (Top 10)") {
      sortedArray = [...chartData]
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
    } else if (selectedOption.value === "High to Low (Top 25)") {
      sortedArray = [...chartData]
        .sort((a, b) => b.value - a.value)
        .slice(0, 25);
    }

    console.log("Sorted array", sortedArray);
    setSortedData(sortedArray);
  };

  const handleElementChange = (selectedOption) => {
    let elePm2 = "pm2.5";
    let elePm10 = "pm10";
    let eleSo2 = "So2";
    let eleNo2 = "No2";

    if (selectedOption.value === "AQI" && selectedYear) {
      setSelectedElement(selectedOption.value);
      let AQIpm10 = 0,
        AQIpm2 = 0,
        AQIso2 = 0,
        AQIno2 = 0;
      let allData = [];

      for (const state in data[selectedYear.value]) {
        for (const city in data[selectedYear.value][state]) {
          const pollutants = data[selectedYear.value][state][city];
          for (const pollutant in pollutants) {
            const value = pollutants[pollutant];
            if (value) {
              if (pollutant === elePm10) {
                AQIpm10 = calculateAQI_PM10(value);
              } else if (pollutant === elePm2) {
                AQIpm2 = calculateAQI_PM2(value);
              } else if (pollutant === eleNo2) {
                AQIpm2 = calculateAQI_NO2(value);
              } else if (pollutant === eleSo2) {
                AQIpm2 = calculateAQI_SO2(value);
              }
            }
          }
          let calcAQI = Math.max(AQIpm10, AQIpm2, AQIno2, AQIso2);
          if (!AQIpm10 && !AQIpm2) {
            continue;
          } else if (calcAQI) {
            allData.push({
              name: city,
              value: calcAQI,
            });
          }
        }
      }
      console.log("here is data 22222 ", allData);
      setChartData(allData);
    } else {
      setSelectedElement(selectedOption.value);

      let allData = [];
      for (const state in data[selectedYear.value]) {
        for (const city in data[selectedYear.value][state]) {
          const pollutants = data[selectedYear.value][state][city];
          for (const pollutant in pollutants) {
            if (pollutant === selectedOption.value) {
              const value = pollutants[pollutant];
              allData.push({
                name: city,
                value: value,
              });
            }
          }
        }
      }
      console.log("here is data ", allData);
      setChartData(allData);
    }
    setSortByOrder("");
  };

  const years = Object.keys(data).map((year) => ({
    value: year,
    label: year,
  }));

  const elements = ["pm2.5", "pm10", "So2", "No2", "AQI"];
  const sortOptions = [
    "Low to High (Top 10)",
    "Low to High (Top 25)",
    "High to Low (Top 10)",
    "High to Low (Top 25)",
  ];

  return (
    <div className="container">
      <div className="heading">Rank Chart</div>
      <div className="chartCompPie">
        <div className="form-statewise">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <label className="sel">Select Year:</label>
              <Select
                options={years}
                onChange={handleYearChange}
                value={selectedYear}
                className="year-statewise"
              />
            </div>
          </div>
          <div>
            {selectedYear && (
              <>
                <label className="sel">Select Element:</label>
                <br></br>
                <select
                  value={selectedElement}
                  onChange={(e) =>
                    handleElementChange({ value: e.target.value })
                  }
                  className="element-statewise SelectComponent"
                >
                  <option value="">Select...</option>
                  {elements?.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div>
            {selectedElement && (
              <>
                <label className="sel">Sort By</label>
                <br></br>
                <select
                  value={sortByOrder}
                  onChange={(e) => handleSortChange({ value: e.target.value })}
                  className="SelectComponent"
                >
                  <option value="">Select...</option>
                  {sortOptions?.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
        {chartData && chartData.length > 0 && sortedData && sortByOrder ? (
          <ResponsiveRankChart allData={sortedData} />
        ) : null}
      </div>
    </div>
  );
};

export default RankBarChartComponent;
