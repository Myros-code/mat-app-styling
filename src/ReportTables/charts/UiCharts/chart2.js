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

const VerticalBar2 = () => {
  const rooms = useSelector((state) => state.rooms);

  const getData = () => {
    let wallH = 0;
    let windowDoorH = 0;
    let roofH = 0;

    rooms.forEach((room) => {
      console.log(room);
      room.items.forEach((wall) => {
        console.log(wall);
        let wallItemsH = calc_group(wall.items, "heatLoss");
        console.log(wallItemsH);
        wallH += wall.heatLoss - wallItemsH;

        wall.items.forEach((item) => {
          if (item.exWallGroup === "roof") {
            roofH += item.heatLoss;
          }
          if (item.exWallGroup === "windows and doors") {
            windowDoorH += item.heatLoss;
          }
        });

        // windowDoorH += wallItemsH;
        console.log(windowDoorH);
        console.log(wallH);
      });
    });

    console.log(windowDoorH);
    console.log(wallH);
    return {
      wallHeatLoss: parseFloat(wallH.toFixed(2)),
      windowDoorHeatLoss: parseFloat(windowDoorH.toFixed(2)),
      roofHeatLoss: parseFloat(roofH.toFixed(2)),
    };
  };

  const { wallHeatLoss, windowDoorHeatLoss, roofHeatLoss } = getData();

  const data = {
    labels: ["Walls", "Windows/doors", "Floors", "Roof"],
    datasets: [
      {
        data: [wallHeatLoss, windowDoorHeatLoss, 0, roofHeatLoss],
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
          Heat loss (building elements)
        </h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default VerticalBar2;
