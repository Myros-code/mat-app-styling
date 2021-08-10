import React from "react";
import RoomsTable from "../ReportTables/RoomsTable";
import ProjectTable from "../ReportTables/ProjectTable";
import Paper from "@material-ui/core/Paper";
import VerticalBar from "../ReportTables/charts/UiCharts/chart1";
import VerticalBar2 from "../ReportTables/charts/UiCharts/chart2";
import VerticalBar3 from "../ReportTables/charts/UiCharts/chart3";

const Report = () => {
  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          padding: "40px",
          backgroundColor: "#f8f8ff",
        }}
        id="report"
      >
        <Paper elevation={0} style={{ marginTop: "50px" }}>
          <ProjectTable />
        </Paper>
        <Paper elevation={0} style={{ marginTop: "50px" }}>
          <RoomsTable />
        </Paper>
        <Paper elevation={0} style={{ marginTop: "50px" }}>
          <div className="chart-container">
            <VerticalBar />
          </div>
        </Paper>
        <Paper elevation={0} style={{ marginTop: "50px" }}>
          <div className="chart-container">
            <VerticalBar2 />
          </div>
        </Paper>
        <Paper elevation={0} style={{ marginTop: "50px" }}>
          <div className="chart-container">
            <VerticalBar3 />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Report;
