import React from "react";
import InfoTable from "../../../common/heatLossCalcCommon/InfoTable/InfoTable";
import { getTableData } from "./functions/getTableData";

const RoomBuildingInfoTable = (props) => {
  const { roomBuilding, roomType } = props;
  const tableData = getTableData(roomBuilding, roomType);

  return (
    <InfoTable
      name={roomBuilding.name}
      isEditable={false}
      tableData={tableData}
    />
  );
};

export default RoomBuildingInfoTable;
