/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Table, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  calculate_item_data,
  calculate_room_data,
  calculate_wallItem_data,
  delete_item_action,
} from "../../redux/store/rooms/actions";
import editIcon from "../../images/svg/edit.svg";
import { useEffect, useState } from "react";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";

const RoomItem = (props) => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const project = useSelector((state) => state.project);
  const cardData = getFieldsData(props.item, props.room);
  const cardLabels = getFieldsUi(cardData);

  const [acTogleTxt, acSetTogleTxt] = useState("Show data");

  const handlerAccordion = (e) => {
    e.target.innerText === "Show data"
      ? acSetTogleTxt("Hide data")
      : acSetTogleTxt("Show data");
  };

  const goToRoomPage = () => {
    props.history.push(`/mat-app/room/${props.room.id}/wall/${props.item.id}`);
  };

  const deleteItem = (roomId, itemId, id) => {
    if (window.confirm(`Do you want to delete ${props.item.name}?`)) {
      let item = document.getElementById(id);
      item.classList.add("flip-out-diag-2-br");
      setTimeout(() => {
        dispatch(delete_item_action(roomId, itemId));
        dispatch(
          calculate_room_data(props.choosedRoomPos - 1, {
            roomT: rooms[props.choosedRoomPos - 1].roomT,
            outsideT: project.outsideT,
          })
        );
      }, 600);
    }
  };

  const calculateData = {
    deltaT: props.deltaT,
    buildingTypeValue: project.buildingType,
  };

  useEffect(() => {
    rooms[props.roomIdx].items[props.itemIdx].items.forEach((element, id) => {
      dispatch(
        calculate_wallItem_data(props.roomIdx, props.itemIdx, id, calculateData)
      );
    });

    dispatch(calculate_item_data(props.roomIdx, props.itemIdx, calculateData));

    dispatch(
      calculate_room_data(props.roomIdx, {
        roomT: rooms[props.choosedRoomPos - 1].roomT,
        outsideT: project.outsideT,
      })
    );
  }, []);

  useEffect(() => {
    rooms[props.roomIdx].items[props.itemIdx].items.forEach((element, id) => {
      dispatch(
        calculate_wallItem_data(props.roomIdx, props.itemIdx, id, calculateData)
      );
    });

    dispatch(calculate_item_data(props.roomIdx, props.itemIdx, calculateData));

    dispatch(
      calculate_room_data(props.roomIdx, {
        roomT: rooms[props.choosedRoomPos - 1].roomT,
        outsideT: project.outsideT,
      })
    );
  }, [
    props.item.name,
    props.item.type,
    props.item.exWallGroup,
    props.item.thermInsul,
    props.item.thickInsul,
    props.item.expPerimeter,
    props.item["length"],
    props.item.height,
    props.item.uValue,
    props.item.floorArea,
    props.item.area,
    props.item.heatLoss,
    props.item.itemName,
  ]);

  return (
    <Accordion defaultActiveKey="1">
      <Card className="card_item" id={props.id}>
        <Card.Header className="card__header card_item__header">
          <div className="card_item__name text-center mb-2">
            {props.item.name}
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="card_item__event-btns">
              <button onClick={goToRoomPage} className="button">
                add/edit openings
              </button>
              <button
                className="button ml-3 button_edit"
                onClick={() => {
                  props.editRoomBuilding({ ...props.item, idx: props.itemIdx });
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
                deleteItem(props.roomId, props.item.id, props.id);
              }}
            >
              Delete
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="card__body card_item__body">
            <Table striped bordered hover>
              <tbody>{cardLabels}</tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default withRouter(RoomItem);
