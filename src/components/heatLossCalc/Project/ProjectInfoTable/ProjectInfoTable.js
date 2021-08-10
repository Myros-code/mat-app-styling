import React from "react";
import InfoTable from "../../../common/heatLossCalcCommon/InfoTable/InfoTable";
import { getTableData } from "./functions/getTableData";

const ProjectInfoTable = (props) => {
  const { project, setModalOpen } = props;
  const tableData = getTableData(project);

  return (
    <InfoTable
      name={project.name}
      isEditable={true}
      tableData={tableData}
      setModalOpen={setModalOpen}
    />
  );
};

export default ProjectInfoTable;
