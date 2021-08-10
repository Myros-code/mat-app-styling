import React from "react";
import RoomItem from "../RoomItem/RoomItem";
import { Col } from "react-bootstrap";

const RoomItems = (props) => {
  const items = props.items.map((roomItem, id) => {
    const position = Number(id + 1);

    return (
      <Col
        xl={4}
        xs={12}
        lg={6}
        md={12}
        sm={12}
        key={roomItem.id}
        className="mt-5"
      >
        <RoomItem
          editRoomBuilding={props.editRoomBuilding}
          id={roomItem.id}
          deltaT={props.deltaT}
          itemId={roomItem.id}
          itemIdx={id}
          roomIdx={props.roomIdx}
          choosedRoomPos={props.choosedRoomPos}
          roomId={props.roomId}
          room={props.room}
          item={roomItem}
          pos={position}
        />
      </Col>
    );
  });
  return items;
};

export default RoomItems;
