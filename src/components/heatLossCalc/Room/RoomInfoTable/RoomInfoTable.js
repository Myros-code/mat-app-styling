import React from "react";
import InfoTable from "../../../common/heatLossCalcCommon/InfoTable/InfoTable";
import { getTableData } from "./functions/getTableData";

const RoomInfoTable = (props) => {
  const { room } = props;
  const tableData = getTableData(room);

  return (
    <InfoTable name={room.name} isEditable={false} tableData={tableData} />
  );
};

export default RoomInfoTable;
