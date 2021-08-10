import { Image } from "@react-pdf/renderer";
const QuickChart = require("quickchart-js");

const ReportChart1 = (props) => {
  const reportChart1 = new QuickChart();

  const data = [
    parseFloat(props.project.transmissionLoss.toFixed(2)),
    parseFloat(props.project.venHeatLoss.toFixed(2)),
    0,
  ];

  reportChart1
    .setConfig({
      type: "bar",
      data: {
        labels: [
          "Transmission heat loss",
          "Ventilation heat loss",
          "Response capacity",
        ],
        datasets: [
          {
            data: data,
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

  const url = reportChart1.getUrl();

  return <Image alt="chart1" src={url} />;
};

export default ReportChart1;
