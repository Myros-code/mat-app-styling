import React from "react";
import { Col } from "react-bootstrap";
import { delete_room_action } from "../../../../redux/store/rooms/actions";
import RoomItemTable from "../RoomItemTable/RoomItemTable";

const RoomItemTables = (props) => {
  const { rooms, buildingType, outsideT, editRoom } = props;

  const roomsUi = rooms.map((room, id) => {
    return (
      <Col xl={4} xs={12} lg={6} md={12} sm={12} key={id} className="mt-5">
        <RoomItemTable
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

export default RoomItemTables;
