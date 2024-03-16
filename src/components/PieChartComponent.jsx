import { useEffect, useState } from "react";
import "../styles/Charts.css";
import "../styles/Chart.css";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Select from "react-select";
import {
  calculateAQI_NO2,
  calculateAQI_PM10,
  calculateAQI_PM2,
  calculateAQI_SO2,
} from "./BarChart/AqiCalculator";
import ResponsivePieChart from "./ResponsivePieChart";

const PieChartComponent = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    setSelectedState([]);
    setSelectedElement("");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setSelectedElement("");
  };

  const handleElementChange = (selectedOption) => {
    let elePm2 = "pm2.5";
    let elePm10 = "pm10";
    let eleSo2 = "So2";
    let eleNo2 = "No2";
    let selectedEle = selectedOption.value;

    if (selectedOption.value === "AQI" && selectedYear && selectedState) {
      setSelectedElement(selectedOption.value);
      let AQIpm10 = 0,
        AQIpm2 = 0,
        AQIso2 = 0,
        AQIno2 = 0;
      let allData = [];

      for (const city in data[selectedYear.value][selectedState]) {
        const pollutants = data[selectedYear.value][selectedState][city];
        for (const pollutant in pollutants) {
          let value = pollutants[pollutant];
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
      setChartData(allData);
    } else {
      setSelectedElement(selectedOption.value);

      let allData = [];
      for (const city in data[selectedYear.value][selectedState]) {
        const pollutants = data[selectedYear.value][selectedState][city];
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
      setChartData(allData);
    }
  };

  const years = Object.keys(data).map((year) => ({
    value: year,
    label: year,
  }));

  const statesArray = Object.keys(data[selectedYear?.value] || {}).map(
    (state) => ({
      value: state,
      label: state,
    })
  );
  const elements =
    selectedYear && selectedState && data[selectedYear.value][selectedState]
      ? Object.keys(
          data[selectedYear.value][selectedState][
            Object.keys(data[selectedYear?.value][selectedState])[0]
          ]
        )
      : [];

  selectedYear && selectedState && elements.push("AQI");

  return (
    <div className="container">
      <div className="heading">Pie Chart</div>
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
            <div>
              {selectedState.length > 0 && (
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
          </div>
          <div>
            {selectedYear && (
              <>
                <label className="sel">Select State:</label>
                <Select
                  options={statesArray}
                  onChange={handleStateChange}
                  value={statesArray.filter((state) =>
                    selectedState.includes(state.value)
                  )}
                  className="state-statewise"
                />
              </>
            )}
          </div>
        </div>
        {chartData && chartData.length > 0 ? (
          <ResponsivePieChart allData={chartData} />
        ) : null}
      </div>
    </div>
  );
};

export default PieChartComponent;
