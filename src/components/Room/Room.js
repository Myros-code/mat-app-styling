/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Table, Accordion } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import editIcon from "../../images/svg/edit.svg";
import { useDispatch } from "react-redux";
import {
  calculate_item_data,
  calculate_room_data,
  calculate_wallItem_data,
} from "../../redux/store/rooms/actions";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";

const Room = (props) => {
  const { editRoom, idx, removeRoom, room, outsideT, buildingType } = props;
  const dispatch = useDispatch();

  const [acTogleTxt, acSetTogleTxt] = useState("Show data");

  const handlerAccordion = (e) => {
    e.target.innerText === "Show data"
      ? acSetTogleTxt("Hide data")
      : acSetTogleTxt("Show data");
  };

  const calculateRoom = () => {
    const currDeltaT = room.roomT - outsideT;

    const calcRoomData = {
      roomT: room.roomT,
      outsideT: outsideT,
    };

    const calcRoomBuildingData = {
      deltaT: currDeltaT,
      buildingTypeValue: buildingType,
    };

    room.items.forEach((wall, wallId) => {
      dispatch(calculate_item_data(idx, wallId, calcRoomBuildingData));
      wall.items.forEach((el, wallItemId) => {
        dispatch(
          calculate_wallItem_data(idx, wallId, wallItemId, calcRoomBuildingData)
        );
      });
    });
    dispatch(calculate_room_data(idx, calcRoomData));
  };

  useEffect(() => {
    calculateRoom();
  }, []);

  useEffect(() => {
    calculateRoom();
  }, [
    outsideT,
    room.width,
    room["length"],
    room.height,
    room.airExRate,
    room.roomT,
    room.heatingPover,
  ]);

  const goToRoomPage = () => {
    props.history.push(`/mat-app/room/${room.id}`);
  };

  const deleteRoom = (id) => {
    if (window.confirm(`Do you want to delete ${room.name}?`)) {
      let card = document.getElementById(id);
      card.classList.add("flip-out-diag-2-br");
      setTimeout(() => {
        dispatch(removeRoom(id));
      }, 600);
    }
  };

  const fieldsData = getFieldsData(room);
  const fieldsUi = getFieldsUi(fieldsData);

  return (
    <Accordion defaultActiveKey="1">
      <Card className="card card_item" id={room.id}>
        <Card.Header className="card__header card_item__header">
          <div className="card_item__name text-center mb-2">{room.name}</div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="card_item__event-btns">
              <button onClick={goToRoomPage} className="button">
                add/edit elements
              </button>
              <button
                className="ml-3 button button_edit"
                onClick={() => {
                  editRoom(room);
                }}
              >
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
              onClick={() => {
                deleteRoom(room.id);
              }}
            >
              Delete
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="card__body card_item__body">
            <Table striped bordered hover>
              <tbody>{fieldsUi}</tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default withRouter(Room);
