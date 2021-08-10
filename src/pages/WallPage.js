import React, { useState } from "react";
import { useSelector } from "react-redux";
import WallNav from "../components/WallNav/WallNav";
import WallItems from "../components/WallItems/WallItems";
import { Row } from "react-bootstrap";
import WallItemModal from "../components/newWallItemModal/WallItemModal";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RoomBuildingInfoTable from "../components/heatLossCalc/RoomBuilding/RoomBuldingInfoTable/RoomBuildingInfoTable";
const WallPage = (props) => {
  const getNavData = (walls, idx) => {
    let prewIdx = Number(idx - 1);
    let nextIdx = Number(idx + 1);
    if (walls[prewIdx] == null) {
      prewIdx = walls.length - 1;
    }
    if (walls[nextIdx] == null) {
      nextIdx = 0;
    }
    return {
      prevPageId: walls[prewIdx].id,
      nextPageId: walls[nextIdx].id,
    };
  };

  const getPageData = (rooms, roomId, wallId) => {
    const curRoomIdx = rooms.findIndex((room) => {
      return room.id.toString() === roomId.toString();
    });

    const curWallIdx = rooms[curRoomIdx].items.findIndex((wall) => {
      return wall.id.toString() === wallId.toString();
    });

    const currentWall = rooms[curRoomIdx].items[curWallIdx];
    const roomNavData = getNavData(rooms[curRoomIdx].items, curWallIdx);
    const { prevPageId, nextPageId } = roomNavData;

    return { currentWall, curRoomIdx, curWallIdx, prevPageId, nextPageId };
  };
  const rooms = useSelector((state) => state.rooms);
  const roomId = props.match.params.id;
  const wallId = props.match.params.wallId;
  const pageData = getPageData(rooms, roomId, wallId);
  const { currentWall, curRoomIdx, curWallIdx, ...navData } = pageData;
  const currentRoom = rooms[curRoomIdx];

  // state for room building opening modal showing/editing
  const [IsModalShow, setModalShow] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);

  // state with data of edited room building openings
  const [editedRoomBuildingOpening, setEditedRoomBuildingOpening] = useState(
    {}
  );

  // function for opening room building modal in editing state
  const editRoomBuildingOpening = (roomBuildingOpening) => {
    setModalEdit(true);
    setEditedRoomBuildingOpening(roomBuildingOpening);
    setModalShow(true);
  };

  const groundFloorType = currentWall.exWallGroup === "ground floor";

  return (
    <div>
      <RoomBuildingInfoTable
        roomBuilding={currentWall}
        roomType={currentRoom.type}
      />
      <div className="mt-4">
        <WallNav navData={navData} roomId={roomId} />
        {/* <WallNav navData={navData} /> */}
      </div>
      <div className="mt-4">
        {groundFloorType ? (
          <Button
            disabled={true}
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
            Sorry, now you can't add openings to ground floor
          </Button>
        ) : (
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
            Add/edit openings
          </Button>
        )}
      </div>

      <WallItemModal
        editedRoomBuildingOpening={editedRoomBuildingOpening}
        isEdit={isModalEdit}
        curRoomIdx={curRoomIdx}
        curWallIdx={curWallIdx}
        roomId={roomId}
        show={IsModalShow}
        onHide={() => {
          setModalEdit(false);
          setModalShow(false);
        }}
      />

      <div className="mt-4">
        <Row>
          <WallItems
            editRoomBuildingOpening={editRoomBuildingOpening}
            curRoomIdx={curRoomIdx}
            curWallIdx={curWallIdx}
            items={currentWall.items}
          />
        </Row>
      </div>
    </div>
  );
};

export default WallPage;
