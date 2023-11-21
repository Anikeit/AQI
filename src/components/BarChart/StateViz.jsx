import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/VizStyles.css";

const StateViz = (prop) => {
  const data = prop.data;

  let newData = [];
  for (let i = 0; i < data.length; i++) {
    newData.push(data[i]);
  }

  return (
    <div className="chart">
      <ResponsiveContainer className="LineChart">
        <LineChart
          width={1000}
          height={800}
          data={data}
          margin={{
            top: 40,
            bottom: 5,
          }}
          className="LineChartLine"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            className="Legend"
            verticalAlign="bottom"
            width={100}
            layout="horizontal"
            align="center"
            iconSize={30}
          />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="data"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StateViz;
