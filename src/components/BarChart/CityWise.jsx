import { useState } from "react";
import Select from "react-select";
import Viz3State from "./Viz3State";
import "../../styles/Chart.css";

// eslint-disable-next-line react/prop-types
const StateWise = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedNewEle, setSelectedNewEle] = useState("");

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    setSelectedState(null);
    setSelectedElement("");
    setSelectedCities([]);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedElement("");
    setSelectedCities([]);
  };

  const handleElementChange = (selectedOption) => {
    let elePm2 = "pm2.5";
    let elePm10 = "pm10";
    let eleSo2 = "So2";
    let eleNo2 = "No2";
    if (selectedOption.value === "AQI" && selectedYear && selectedState) {
      setSelectedNewEle("AQI");
      if (elements.includes(elePm10)) {
        setSelectedElement(elePm10);
      } else if (elements.includes(elePm2)) {
        setSelectedElement(elePm2);
      } else if (elements.includes(eleSo2)) {
        setSelectedElement(eleSo2);
      } else if (elements.includes(eleNo2)) {
        setSelectedElement(eleNo2);
      }
    } else {
      setSelectedNewEle(selectedOption.value);
      setSelectedElement(selectedOption.value);
    }
    setSelectedCities([]);
  };

  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
  };

  const years = Object.keys(data).map((year) => ({
    value: year,
    label: year,
  }));

  const elements =
    selectedYear && selectedState
      ? Object.keys(
          data[selectedYear.value][selectedState.value][
            Object.keys(data[selectedYear.value][selectedState.value])[0]
          ]
        )
      : [];

  selectedYear && selectedState && elements.push("AQI");
  const statesArray = Object.keys(data[selectedYear?.value] || {}).map(
    (state) => ({
      value: state,
      label: state,
    })
  );

  const cityOptions =
    selectedYear && selectedState && selectedElement
      ? Object.keys(data[selectedYear.value][selectedState.value])
          .filter(
            (city) =>
              data[selectedYear.value][selectedState.value][city][
                selectedElement
              ]
          )
          .map((city) => ({
            value: city,
            label: city,
          }))
      : [];

  let alldata3 = [];
  if (
    selectedYear &&
    selectedElement &&
    selectedState &&
    selectedCities.length > 0 &&
    selectedNewEle != "AQI"
  ) {
    selectedCities.forEach((city) => {
      if (
        data[selectedYear.value][selectedState.value][city.value] &&
        data[selectedYear.value][selectedState.value][city.value][
          selectedElement
        ]
      ) {
        const concentration =
          data[selectedYear.value][selectedState.value][city.value][
            selectedElement
          ];
        alldata3.push({
          city: city.label,
          data: concentration,
        });
      }
    });
  } else if (
    selectedYear &&
    selectedElement &&
    selectedState &&
    selectedNewEle == "AQI" &&
    selectedCities.length > 0
  ) {
    let reqpm10 = 150;
    let reqpm2 = 60;
    let reqso2 = 50;
    let reqno2 = 40;
    selectedCities.forEach((city) => {
      if (
        data[selectedYear.value][selectedState.value][city.value] &&
        data[selectedYear.value][selectedState.value][city.value][
          selectedElement
        ]
      ) {
        let concentration =
          data[selectedYear.value][selectedState.value][city.value][
            selectedElement
          ];
        if (selectedElement == "pm2.5") {
          concentration = (concentration / reqpm2) * 100;
          alldata3.push({
            city: city.label,
            data: concentration,
          });
        } else if (selectedElement == "pm10") {
          concentration = (concentration / reqpm10) * 100;
          alldata3.push({
            city: city.label,
            data: concentration,
          });
        } else if (selectedElement == "So2") {
          concentration = (concentration / reqso2) * 100;
          alldata3.push({
            city: city.label,
            data: concentration,
          });
        } else if (selectedElement == "No2") {
          concentration = (concentration / reqno2) * 100;
          alldata3.push({
            city: city.label,
            data: concentration,
          });
        }
      }
    });
  }

  return (
    <div className="container">
      <div className="heading">City Wise Comparison for Each State</div>
      <div className="chartComp">
        <div className="form">
          <label className="sel">Select Year:</label>
          <Select
            options={years}
            onChange={handleYearChange}
            value={selectedYear}
            className="Year"
          />

          {selectedYear && (
            <>
              <label className="sel">Select State:</label>
              <Select
                options={statesArray}
                onChange={handleStateChange}
                value={selectedState}
                className="State"
              />

              {selectedState && (
                <>
                  <label className="sel">Select Element:</label>
                  {/* <Select
                  options={elements.map((element) => ({
                    value: element,
                    label: element,
                  }))}
                  value={selectedNewEle}
                  onChange={handleElementChange}
                  className="Element"
                /> */}
                  <br></br>
                  <select
                    value={selectedNewEle}
                    onChange={(e) =>
                      handleElementChange({ value: e.target.value })
                    }
                    className="Element"
                  >
                    <option value="">Select</option>
                    {elements.map((element) => (
                      <option key={element} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                  <br></br>

                  <label  className="sel">Select Cities:</label>
                  <Select
                    options={cityOptions}
                    onChange={handleCityChange}
                    value={selectedCities}
                    isMulti
                    className="City"
                  />
                </>
              )}
            </>
          )}
        </div>
        <div className="chart-container">
          {alldata3 != null && <Viz3State data={alldata3} />}
        </div>
      </div>
    </div>
  );
};

export default StateWise;
