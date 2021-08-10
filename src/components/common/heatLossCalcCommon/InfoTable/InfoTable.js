import React from "react";
import { Card, Table } from "react-bootstrap";
import { getUi } from "./functions/getUi";
import { InfoTableHeader, InfoTableHeaderEditable } from "./InfoTableHeader";

const InfoTable = (props) => {
  const { name, tableData, isEditable, setModalOpen } = props;
  const tableUi = getUi(tableData);

  const tableHeader = isEditable ? (
    <InfoTableHeaderEditable name={name} setModalOpen={setModalOpen} />
  ) : (
    <InfoTableHeader name={name} />
  );

  return (
    <Card className="card card_info">
      {tableHeader}
      <Card.Body className="card__body card_info__body">
        <Table striped bordered hover>
          <tbody>{tableUi}</tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default InfoTable;
