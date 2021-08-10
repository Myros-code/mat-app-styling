/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Table, Accordion } from "react-bootstrap";
import editIcon from "../../images/svg/edit.svg";
import {
  calculate_item_data,
  calculate_wallItem_data,
  delete_wallItem_action,
} from "../../redux/store/rooms/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";
const WallItem = (props) => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const project = useSelector((state) => state.project);
  const cardData = getFieldsData(props.wallItem);
  const cardLabels = getFieldsUi(cardData);

  const [acTogleTxt, acSetTogleTxt] = useState("Show data");

  const handlerAccordion = (e) => {
    e.target.innerText === "Show data"
      ? acSetTogleTxt("Hide data")
      : acSetTogleTxt("Show data");
  };


  const calculateData = {
    deltaT: rooms[props.curRoomIdx].deltaT,
    buildingTypeValue: project.buildingType,
  };

  useEffect(() => {
    dispatch(
      calculate_wallItem_data(
        props.curRoomIdx,
        props.curWallIdx,
        props.itemIdx,
        calculateData
      )
    );
    dispatch(
      calculate_item_data(props.curRoomIdx, props.curWallIdx, calculateData)
    );
  }, []);

  useEffect(() => {
    dispatch(
      calculate_wallItem_data(
        props.curRoomIdx,
        props.curWallIdx,
        props.itemIdx,
        calculateData
      )
    );
    dispatch(
      calculate_item_data(props.curRoomIdx, props.curWallIdx, calculateData)
    );
  }, [
    props.wallItem.name,
    props.wallItem["length"],
    props.wallItem.height,
    props.wallItem.uValue,
    props.wallItem.area,
    props.wallItem.heatLoss,
    props.wallItem.itemName,
  ]);

  const deleteItem = (roomIdx, wallIdx, itemIdx, itemId) => {
    if (window.confirm(`Do you want to delete ${props.wallItem.name}?`)) {
      const item = document.getElementById(itemId);
      item.classList.add("flip-out-diag-2-br");
      setTimeout(() => {
        dispatch(delete_wallItem_action(roomIdx, wallIdx, itemIdx));
        dispatch(
          calculate_item_data(props.curRoomIdx, props.curWallIdx, calculateData)
        );
        item.classList.remove("flip-out-diag-2-br");
      }, 600);
    }
  };

  return (
    <Accordion defaultActiveKey="1">
      <Card className="card_item" id={props.wallItem.id}>
        <Card.Header className="card__header card_item__header">
          <div className="card_item__name text-center mb-2">
            {props.wallItem.name}
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="card_item__event-btns card_item__event-btns_ended">
              <button
                className="button button_edit"
                onClick={() => {
                  props.editRoomBuildingOpening({
                    ...props.wallItem,
                    idx: props.itemIdx,
                  });
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
              className="button button_delete card_item__button_delete card_item__button_delete_ended"
              onClick={() => {
                deleteItem(
                  props.curRoomIdx,
                  props.curWallIdx,
                  props.itemIdx,
                  props.wallItem.id
                );
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

export default WallItem;
