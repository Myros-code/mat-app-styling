/* eslint-disable react-hooks/exhaustive-deps */
import ItemTable from "../../../common/heatLossCalcCommon/ItemTable/ItemTable";
import { useDispatch } from "react-redux";
import { getTableData } from "./functions/getTableData";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import {
  calculate_item_data,
  calculate_room_data,
  calculate_wallItem_data,
} from "../../../../redux/store/rooms/actions";
const RoomItemTable = (props) => {
  const { editRoom, idx, removeRoom, room, outsideT, buildingType } = props;

  const dispatch = useDispatch();

  const goToRoomInfoTable = () => {
    props.history.push(`/mat-app/room/${room.id}`);
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

  const deleteRoomItemTable = () => {
    if (window.confirm(`Do you want to delete ${room.name}?`)) {
      let card = document.getElementById(room.id);
      card.classList.add("flip-out-diag-2-br");
      setTimeout(() => {
        dispatch(removeRoom(room.id));
      }, 600);
    }
  };

  const editRoomItemTable = () => {
    editRoom(room);
  };

  const tableData = getTableData(room);

  return (
    <ItemTable
      tableId={room.id}
      tableName={room.name}
      goToInfoTable={goToRoomInfoTable}
      deleteTable={deleteRoomItemTable}
      hasInfoTable={true}
      editTable={editRoomItemTable}
      tableData={tableData}
    />
  );
};
export default withRouter(RoomItemTable);
