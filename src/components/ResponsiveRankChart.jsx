/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import "../styles/Pollution.css";
import LinkIcon from "../Images/LinkIcon.png";
import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { useEffect } from "react";
import Legend from "./BarChart/Demographic/components/Legend";

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

const ResponsiveRankChart = ({ allData }) => {
  console.log("in comp", allData);
  return (
    <>
      <ResponsiveContainer>
        <BarChart
          width={300}
          height={300}
          data={allData}
          layout="vertical"
          margin={{
            top: 30,
            right: 50,
            left: 90,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" interval={0}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {allData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default ResponsiveRankChart;
