import { Image } from "@react-pdf/renderer";
import { calc_group } from "../../../calculation/calc_group";
const QuickChart = require("quickchart-js");

const ReportChart2 = (props) => {
  const getData = () => {
    let wallH = 0;
    let windowDoorH = 0;
    let roofH = 0;

    props.rooms.forEach((room) => {
      room.items.forEach((wall) => {
        let wallItemsH = calc_group(wall.items, "heatLoss");
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
      });
    });

    return {
      wallHeatLoss: parseFloat(wallH.toFixed(2)),
      windowDoorHeatLoss: parseFloat(windowDoorH.toFixed(2)),
      roofHeatLoss: parseFloat(roofH.toFixed(2)),
    };
  };
  const data = getData();
  const reportChart2 = new QuickChart();
  reportChart2
    .setConfig({
      type: "bar",
      data: {
        labels: ["Walls", "Windows/doors", "Floors", "Roof"],
        datasets: [
          {
            data: [
              data.wallHeatLoss,
              data.windowDoorHeatLoss,
              0,
              data.roofHeatLoss,
            ],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1.5,
          },
        ],
      },
      options: {
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
      },
    })
    .setWidth(800)
    .setHeight(400)
    .setBackgroundColor("transparent");
  const url = reportChart2.getUrl();
  return <Image alt="chart2" src={url} />;
};

export default ReportChart2;
