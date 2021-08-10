import { Image } from "@react-pdf/renderer";
import { calc_group } from "../../../calculation/calc_group";
const QuickChart = require("quickchart-js");

const ReportChart3 = (props) => {
  const reportChart3 = new QuickChart();

  const getData = () => {
    let wallYearH = 0;
    let windowDoorH = 0;
    let roofH = 0;
    let ventYearH = 0;

    props.rooms.forEach((room) => {
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

  const data = getData();

  reportChart3
    .setConfig({
      type: "bar",
      data: {
        labels: ["Walls", "Windows/doors", "Floors", "Roof", "Ventilation"],
        datasets: [
          {
            data: [data.wYearH, data.w_dYearH, 3, data.rYearH, data.vYearH],
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
      },
    })
    .setWidth(800)
    .setHeight(400)
    .setBackgroundColor("transparent");
  const url = reportChart3.getUrl();
  return <Image alt="chart3" src={url} />;
};

export default ReportChart3;
