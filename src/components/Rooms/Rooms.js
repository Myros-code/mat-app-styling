import React from "react";
import Room from "../Room/Room";
import { delete_room_action } from "../../redux/store/rooms/actions";
import { Col } from "react-bootstrap";
const Rooms = (props) => {
  const { rooms, buildingType, outsideT, editRoom } = props;

  const roomsUi = rooms.map((room, id) => {
    return (
      <Col xl={4} xs={12} lg={6} md={12} sm={12} key={room.id} className="mt-5">
        <Room
          buildingType={buildingType}
          outsideT={outsideT}
          editRoom={editRoom}
          idx={id}
          removeRoom={delete_room_action}
          room={room}
        />
      </Col>
    );
  });
  return roomsUi;
};

export default Rooms;
