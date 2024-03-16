/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import "../styles/Pollution.css";
import LinkIcon from "../Images/LinkIcon.png";
import { Pie, PieChart, Tooltip, ResponsiveContainer , Cell} from "recharts";
import { useEffect } from "react";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  let textAnchor;
  if (x > cx) {
    // Place label to the right of the slice
    textAnchor = "start";
  } else {
    // Place label to the left of the slice
    textAnchor = "end";
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={textAnchor}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = [
  "#0088FE",
  "#1E8CFA",
  "#3C90FC",
  "#5A95FD",
  "#7899FE",
  "#979DFE",
  "#B5A1FE",
  "#D3A5FE",
  "#F1AAFE",
  "#F6ABFD",
  "#FCAEFC",
  "#FDAFED",
  "#FEAFD0",
  "#FEAFB3",
  "#FEAF96",
  "#FEAF79",
  "#FEAF5C",
  "#FEAF3F",
  "#FEAF22",
  "#FEAF05",
  "#FDBB04",
  "#FDC702",
  "#FDDE01",
  "#FEF400",
  "#F3F200",
  "#D6F200",
  "#B9F200",
  "#9CF200",
  "#7FF200",
  "#62F200",
  "#45F200",
];

const ResponsivePieChart = ({ allData }) => {
  return (
    <div style={{height : '400px', width : '100%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={allData}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            innerRadius={50}
            outerRadius={150}
            labelLine={false}
            fill="#82ca9d"
          >
            {allData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ResponsivePieChart;
