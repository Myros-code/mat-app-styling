import React, { useState } from "react";
import RoomNav from "../components/RoomNav/RoomNav";
import RoomItems from "../components/RoomItems/RoomItems";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RoomItemModal from "../components/newRoomItemModal/newRoomItemModal";
import RoomInfoTable from "../components/heatLossCalc/Room/RoomInfoTable/RoomInfoTable";

const RoomPage = (props) => {
  // GET PREV/NEXT ROOM INDEX POSITION IN ROOM ARRAY
  const getNavData = (rooms, idx) => {
    let prewIdx = Number(idx - 1);
    let nextIdx = Number(idx + 1);
    if (rooms[prewIdx] == null) {
      prewIdx = rooms.length - 1;
    }
    if (rooms[nextIdx] == null) {
      nextIdx = 0;
    }
    return {
      prevPageId: rooms[prewIdx].id,
      nextPageId: rooms[nextIdx].id,
    };
  };

  const getPageData = (rooms, id) => {
    // GET INDEX OF ROOM OBJ IN ROOMS ARRAY
    const currentIdx = rooms.findIndex((room) => {
      return room.id.toString() === id.toString();
    });

    // GET ROOM POSITION №#
    const currentPos = Number(currentIdx + 1);
    const roomNavData = getNavData(rooms, currentIdx);
    const { prevPageId, nextPageId } = roomNavData;
    const choosedRoom = rooms[currentIdx];

    return {
      choosedRoom,
      currentPos,
      currentIdx,
      prevPageId,
      nextPageId,
    };
  };

  const roomId = props.match.params.id;
  const rooms = useSelector((state) => state.rooms);
  const pageData = getPageData(rooms, roomId);
  const { choosedRoom, currentPos, currentIdx, ...navData } = pageData;
  const roomItems = choosedRoom.items;
  const choosedRoomPos = rooms.indexOf(choosedRoom);

  // state for room buildings showing/editing
  const [IsModalShow, setModalShow] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);

  // state with data of edited room building
  const [editedRoomBuilding, setEditedRoomBuilding] = useState({});

  // function for opening room building modal in editing state
  const editRoomBuilding = (roomBuilding) => {
    setModalEdit(true);
    setEditedRoomBuilding(roomBuilding);
    setModalShow(true);
  };

  return (
    <div>
      <RoomInfoTable room={choosedRoom}/>
      <div className="mt-4">
        <RoomNav navData={navData} />
      </div>
      <div className="mt-4">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setModalShow(true)}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderWidth: "2px",
            fontSize: "20px",
          }}
        >
          <AddBoxIcon />
          add/edit building element
        </Button>
      </div>
      <div className="mt-4">
        <Row>
          <RoomItems
            editRoomBuilding={editRoomBuilding}
            roomIdx={currentIdx}
            room={choosedRoom}
            deltaT={choosedRoom.deltaT}
            choosedRoomPos={currentPos}
            items={roomItems}
            roomId={roomId}
          />
        </Row>
      </div>
      <RoomItemModal
        room={choosedRoom}
        editedRoomBuilding={editedRoomBuilding}
        isEdit={isModalEdit}
        roomIdx={currentIdx}
        roomId={roomId}
        pos={currentPos}
        show={IsModalShow}
        editRoom={isModalEdit}
        onHide={() => {
          setModalEdit(false);
          setModalShow(false);
        }}
      />
    </div>
  );
};

export default RoomPage;
