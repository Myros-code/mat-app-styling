import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../redux/store/app/actions";

const QuickChart = require("quickchart-js");

export const GetReportChartUrl = (config, width, height, color) => {
  const chart = new QuickChart();
  chart
    .setConfig(config)
    .setWidth(width)
    .setHeight(height)
    .setBackgroundColor(color);

  return chart.getUrl();
};

export const GetReport1Data = () => {
  const project = useSelector((state) => state.project);
  console.log(project);
};

export const ClearStore = () => {
  useDispatch(resetStore());
};
