import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";

const data = (project) => {
  return {
    labels: [
      "Transmission heat loss",
      "Ventilation heat loss",
      "Response capacity",
    ],
    datasets: [
      {
        data: [
          parseFloat(project.transmissionLoss.toFixed(2)),
          parseFloat(project.venHeatLoss.toFixed(2)),
          0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1.5,
      },
    ],
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 0.6,
      },
    ],
  },
  plugins: {
    datalabels: {
      anchor: "end",
      align: "top",
      formatter: (value) => {
        if (value === 0) {
          return "Empty";
        } else {
          return value + " W";
        }
      },
      color: "white",
      backgroundColor: "#0D47A1",
      borderRadius: 5,
      font: {
        size: 14,
      },
      labels: {
        title: {
          font: {},
        },
        value: {},
      },
    },
  },
  legend: {
    display: false,
  },
};

const VerticalBar = () => {
  const project = useSelector((state) => state.project);

  return (
    <>
      <div className="header">
        <h3 className="title" style={{ textAlign: "center", padding: "20px" }}>
          Heat loss summary
        </h3>
      </div>
      <Bar data={data(project)} options={options} />
    </>
  );
};

export default VerticalBar;
