import React, { useState } from "react";
import editIcon from "../../../../images/svg/edit.svg";
import { Card, Table, Accordion } from "react-bootstrap";
import { getUi } from "./functions/getUi";

const ItemTable = (props) => {
  const {
    tableId,
    tableName,
    goToInfoTable,
    editTable,
    deleteTable,
    tableData,
    hasInfoTable,
  } = props;

  const tableUi = getUi(tableData);

  const [acTogleTxt, acSetTogleTxt] = useState("Show data");

  const handlerAccordion = (e) => {
    e.target.innerText === "Show data"
      ? acSetTogleTxt("Hide data")
      : acSetTogleTxt("Show data");
  };

  const goToBtn = hasInfoTable ? (
    <button onClick={goToInfoTable} className="button">
      add/edit elements
    </button>
  ) : (
    ""
  );

  return (
    <Accordion defaultActiveKey="1">
      <Card className="card card_item" id={tableId}>
        <Card.Header className="card__header card_item__header">
          <div className="card_item__name text-center mb-2">{tableName}</div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="card_item__event-btns">
              {goToBtn}
              <button className="ml-3 button button_edit" onClick={editTable}>
                <img
                  className="button__img button_edit__img"
                  src={editIcon}
                  alt="Edit"
                />
              </button>
              <Accordion.Toggle
                className="ml-3 button"
                eventKey="0"
                onClick={handlerAccordion}
              >
                {acTogleTxt}
              </Accordion.Toggle>
            </div>
            <button
              className="button button_delete card_item__button_delete"
              onClick={deleteTable}
            >
              Delete
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="card__body card_item__body">
            <Table striped bordered hover>
              <tbody>{tableUi}</tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default ItemTable;
