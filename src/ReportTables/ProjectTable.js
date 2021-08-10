import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const showUnit = (obj) => {
  if (obj.hasOwnProperty("unit")) {
    return obj.unit;
  }
};

const createTable = (columnsData, tableData) => {
  const tableHeaderElements = columnsData.map((el, id) => {
    return (
      <th className="report-table__cell" key={id} style={{ verticalAlign: "middle" }}>
        {el.title}
        <br />
        {showUnit(el)}
      </th>
    );
  });

  const tableBodyRows = tableData.map((el, id) => {
    const tableCells = Object.entries(el).map((item, itemId) => {
      return <td className="report-table__cell" key={itemId}>{item[1]}</td>;
    });
    return <tr style={{ textAlign: "center" }}  key={id}>{tableCells}</tr>;
  });

  return { tableHeaderElements, tableBodyRows };
};

const ProjectTable = () => {
  const project = useSelector((state) => state.project);

  const columnsData = [
    { title: "Name", field: "name" },
    { title: "Outside temp", unit: "[°С]", field: "outsideT" },
    { title: "Ground temp", unit: "[°С]", field: "groundT" },
    { title: "Degree days", field: "dDays" },
    { title: "Total floor area", unit: "[m²]", field: "totalFloorArea" },
    { title: "Specific heat loss", unit: "[W]", field: "totalHeatLoss" },
    { title: "Total-heat-loss", unit: "[W/m²]", field: "specHeatLoss" },
  ];

  const tableData = [
    {
      name: project.name,
      outsideT: parseFloat(project.outsideT.toFixed(2)),
      groundT: parseFloat(project.outsideT.toFixed(2)),
      dDays: parseFloat(project.dDays.toFixed(2)),
      totalFloorArea: parseFloat(project.totalFloorArea.toFixed(2)),
      specHeatLoss: parseFloat(project.specHeatLoss.toFixed(2)),
      totalHeatLoss: parseFloat(project.totalHeatLoss.toFixed(2)),
    },
  ];

  const tableUi = createTable(columnsData, tableData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr style={{ textAlign: "center" }}>{tableUi.tableHeaderElements}</tr>
      </thead>
      <tbody>{tableUi.tableBodyRows}</tbody>
    </Table>
  );
};

export default ProjectTable;
