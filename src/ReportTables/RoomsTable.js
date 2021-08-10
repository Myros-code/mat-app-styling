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
      <th
        className="report-table_rooms__cell"
        style={{ verticalAlign: "middle" }}
        key={id}
      >
        {el.title}
        <br />
        {showUnit(el)}
      </th>
    );
  });

  const tableBodyRows = tableData.map((el, id) => {
    const tableCells = Object.entries(el).map((item, itemId) => {
      return (
        <td className="report-table_rooms__cell" key={itemId}>
          {item[1]}
        </td>
      );
    });
    return (
      <tr style={{ textAlign: "center" }} key={id}>
        {tableCells}
      </tr>
    );
  });

  return { tableHeaderElements, tableBodyRows };
};

const RoomsTable = () => {
  const rooms = useSelector((state) => state.rooms);

  const columnsData = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Room temp", unit: "[°С]", field: "roomT" },
    { title: "Floor area", unit: "[m²]", field: "area" },
    { title: "Room volume", unit: "[m³]", field: "roomVolume" },
    { title: "Ventilation-loss", unit: "[W]", field: "venHeatLoss" },
    { title: "Transmission-loss", unit: "[W]", field: "transmissionLoss" },
    { title: "Specific heat loss", unit: "[W/m²]", field: "specHeatLoss" },
    { title: "Response capacity", unit: "[W]", field: "respCapacity" },
    { title: "Total-heat-loss", unit: "[W]", field: "totalHeatLoss" },
  ];

  const tableData = rooms.map((room, id) => {
    return {
      id: id,
      name: room.name,
      area: parseFloat(room.area.toFixed(2)),
      roomT: parseFloat(room.roomT.toFixed(2)),
      roomVolume: parseFloat(room.roomVolume.toFixed(2)),
      venHeatLoss: parseFloat(room.venHeatLoss.toFixed(2)),
      transmissionLoss: parseFloat(room.transmissionLoss.toFixed(2)),
      specHeatLoss: parseFloat(room.specHeatLoss.toFixed(2)),
      respCapacity: parseFloat(room.heatingPover.toFixed(2)),
      totalHeatLoss: parseFloat(room.totalHeatLoss.toFixed(2)),
    };
  });

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

export default RoomsTable;
