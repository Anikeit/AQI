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

export default function Viz2(prop) {
  const data = prop.data;
  return (
    <div className="chart">
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* STATE WISE */}
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            className="Legend"
            verticalAlign="bottom"
            width={100}
            layout="horizontal"
            align="center"
            iconSize={30}
          />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="data" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
