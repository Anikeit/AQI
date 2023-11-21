import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import "../../styles/VizStyles.css";
  
  export default function Viz3(prop) {
    const data = prop.data;
  
    return (
      <div className="chart">
        <ResponsiveContainer>
          <BarChart
            width={1500}
            height={2300}
            data={data}
            margin={{
              top: 100,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            className="CityWise"
          >
            <Legend
              className="Legend"
              verticalAlign="top"
              width={100}
              layout="vertical"
              align="right"
              margin={{ left: 30 }}
              iconSize={20}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="data" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  