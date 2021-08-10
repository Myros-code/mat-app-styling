import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { calc_group } from "../../../calculation/calc_group";

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
          return value + " kwh";
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

const VerticalBar3 = () => {
  const rooms = useSelector((state) => state.rooms);
  const getData = () => {
    let wallYearH = 0;
    let windowDoorH = 0;
    let roofH = 0;
    let ventYearH = 0;

    rooms.forEach((room) => {
      ventYearH += (room.venHeatLoss / room.deltaT) * 24 * 2000;

      room.items.forEach((wall) => {
        let wallItemsH = calc_group(wall.items, "heatLoss");

        wallYearH += ((wall.heatLoss - wallItemsH) / room.deltaT) * 24 * 2000;

        wall.items.forEach((item) => {
          if (item.exWallGroup === "roof") {
            roofH += (item.heatLoss / room.deltaT) * 24 * 2000;
          }
          if (item.exWallGroup === "windows and doors") {
            windowDoorH += (item.heatLoss / room.deltaT) * 24 * 2000;
          }
        });
      });
    });

    return {
      vYearH: parseFloat(ventYearH.toFixed(2)),
      rYearH: parseFloat(roofH.toFixed(2)),
      w_dYearH: parseFloat(windowDoorH.toFixed(2)),
      wYearH: parseFloat(wallYearH.toFixed(2)),
    };
  };

  const { vYearH, rYearH, w_dYearH, wYearH } = getData();

  const data = {
    labels: ["Walls", "Windows/doors", "Floors", "Roof", "Ventilation"],
    datasets: [
      {
        data: [wYearH, w_dYearH, 3, rYearH, vYearH],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h3 className="title" style={{ textAlign: "center", padding: "20px" }}>
          Annual heating consumption
        </h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default VerticalBar3;
