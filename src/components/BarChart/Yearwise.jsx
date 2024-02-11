import { useState } from "react";
import StateViz from "./StateViz";
import "../../styles/Chart.css";
import Legend from "./Demographic/components/Legend";
import LegendTable from "./Demographic/components/Table";

// eslint-disable-next-line react/prop-types
const DropDownComponent = ({ data }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedNewEle, setSelectedNewEle] = useState("");

  let selectedYear = "2021";
  const states = data[selectedYear] ? Object.keys(data[selectedYear]) : [];
  const cities =
    selectedState && data[selectedYear] && data[selectedYear][selectedState]
      ? Object.keys(data[selectedYear][selectedState])
      : [];
  const elements =
    selectedCity &&
    data[selectedYear] &&
    data[selectedYear][selectedState] &&
    data[selectedYear][selectedState][selectedCity]
      ? Object.keys(data[selectedYear][selectedState][selectedCity])
      : [];
  selectedCity && elements.push("AQI");

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
    setSelectedElement("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedElement("");
  };
  const handleElementChange = (event) => {
    let elePm2 = "pm2.5";
    let elePm10 = "pm10";
    let eleSo2 = "So2";
    let eleNo2 = "No2";
    if (
      event.target.value === "AQI" &&
      selectedYear &&
      selectedState &&
      selectedCity
    ) {
      setSelectedNewEle("AQI");
      if (data[selectedYear][selectedState][selectedCity][elePm10]) {
        setSelectedElement(elePm10);
      } else if (data[selectedYear][selectedState][selectedCity][elePm2]) {
        setSelectedElement(elePm2);
      } else if (data[selectedYear][selectedState][selectedCity][eleSo2]) {
        setSelectedElement(eleSo2);
      } else if (data[selectedYear][selectedState][selectedCity][eleNo2]) {
        setSelectedElement(eleNo2);
      }
    } else {
      setSelectedElement(event.target.value);
      setSelectedNewEle(event.target.value);
    }
  };
  let allData = [];
  if (
    selectedCity &&
    selectedState &&
    selectedElement &&
    selectedNewEle != "AQI"
  ) {
    for (let i = 2013; i < 2022; i++) {
      let ele = selectedElement;
      if (
        data[i] &&
        data[i][selectedState] &&
        data[i][selectedState][selectedCity]
      ) {
        allData.push({
          year: i,
          data: data[i][selectedState][selectedCity][ele],
        });
      }
    }
    // console.log(allData);
  } else if (
    selectedCity &&
    selectedElement &&
    selectedElement &&
    selectedNewEle == "AQI"
  ) {
    let reqpm10 = 150;
    let reqpm2 = 60;
    let reqso2 = 50;
    let reqno2 = 40;
    for (let i = 2013; i < 2022; i++) {
      let ele = selectedElement;
      if (
        data[i] &&
        data[i][selectedState] &&
        data[i][selectedState][selectedCity]
      ) {
        if (ele == "pm10")
          allData.push({
            year: i,
            data: (data[i][selectedState][selectedCity][ele] / reqpm10) * 100,
          });
        else if (ele == "pm2.5") {
          allData.push({
            year: i,
            data: (data[i][selectedState][selectedCity][ele] / reqpm2) * 100,
          });
        } else if (ele == "So2") {
          allData.push({
            year: i,
            data: (data[i][selectedState][selectedCity][ele] / reqso2) * 100,
          });
        } else if (ele == "No2") {
          allData.push({
            year: i,
            data: (data[i][selectedState][selectedCity][ele] / reqno2) * 100,
          });
        }
      }
    }
    // console.log(allData);
  }

  return (
    <div className="container ">
      <div className="heading">Year Wise Comparison</div>
      <div className="chartComp-yearwise">
        <div className="form-yearwise">
          <div>
            <label className="sel">Select State:</label>
            <br></br>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="state-yearwise"
            >
              <option value="">Select...</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <br></br>
          </div>
          <div>
            <label className="sel">Select City:</label>
            <br></br>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="city-yearwise"
            >
              <option value="">Select...</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <br></br>
          </div>
          <div>
            <label className="sel">Select Element:</label>
            <br></br>
            <select
              value={selectedNewEle}
              onChange={handleElementChange}
              className="element-yearwise"
            >
              <option value="">Select...</option>
              {elements.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="chart-container">
          {allData != null && <StateViz data={allData} />}
        </div>
      </div>
      {allData != null && (
        <div>
          <LegendTable element={selectedElement} />
        </div>
      )}
    </div>
  );
};
export default DropDownComponent;
