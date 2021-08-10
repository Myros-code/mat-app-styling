import React from "react";
import { Card } from "react-bootstrap";
import editIcon from "../../../../images/svg/edit.svg";

export const InfoTableHeader = (props) => {
  const { name } = props;
  return (
    <Card.Header className="card__header card_info__header">{name}</Card.Header>
  );
};

export const InfoTableHeaderEditable = (props) => {
  const { name, setModalOpen } = props;
  return (
    <Card.Header className="card__header card_info__header">
      {" "}
      <div>
        <span style={{ float: "left" }}>
          <button
            className="mr-2 button button_edit"
            style={{ display: "flex" }}
            onClick={setModalOpen}
          >
            <img
              className="button_img button_edit__img"
              src={editIcon}
              alt="Edit"
            />
          </button>
        </span>
        <span>{name}</span>
      </div>
    </Card.Header>
  );
};
