import React, { useState } from "react";
import Rooms from "../components/Rooms/Rooms";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NewModal from "../components/newModal/newModal";
import ProjectModal from "../components/ProjectModal/ProjectModal";
import generatePdfDocument from "../ReportTables/ReportFunk";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ProjectInfoTable from "../components/heatLossCalc/Project/ProjectInfoTable/ProjectInfoTable";
import RoomItemTables from "../components/heatLossCalc/Room/RoomItemTables/RoomItemTables";
const Project = () => {
  // get rooms and project data from state
  const { rooms, project } = useSelector((state) => state);

  // state for roomModal showing/editing
  const [IsModalShow, setModalShow] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);

  // state with data of edited room
  const [editedRoom, setEditedRoom] = useState({});

  // state for projectModal showing
  const [IsProjectModalShow, setProjectModalShow] = useState(false);

  // function for opening roomModal in editing state
  const editRoom = (room) => {
    setModalEdit(true);
    setEditedRoom(room);
    setModalShow(true);
  };

  const setModalOpen = () => {
    setProjectModalShow(true);
  };

  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="mb-4 d-flex align-items-center justify-content-center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            generatePdfDocument(project, rooms, setLoading);
          }}
        >
          <PictureAsPdfIcon className="mr-2" />
          {loading ? "Loading report..." : "Download report!"}
        </Button>
      </div>
      <ProjectInfoTable setModalOpen={setModalOpen} project={project} />
      <ProjectModal
        project={project}
        show={IsProjectModalShow}
        onHide={() => {
          setProjectModalShow(false);
        }}
      />
      <div className="mt-4">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            setModalShow(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderWidth: "2px",
            fontSize: "20px",
          }}
        >
          <AddBoxIcon />
          New room
        </Button>
      </div>
      <div className="mt-4">
        <Row>
          <RoomItemTables
            rooms={rooms}
            editRoom={editRoom}
            buildingType={project.buildingType}
            outsideT={project.outsideT}
          />
        </Row>
      </div>
      <NewModal
        editedRoom={editedRoom}
        isEdit={isModalEdit}
        show={IsModalShow}
        onHide={() => {
          setModalEdit(false);
          setModalShow(false);
        }}
      />
    </div>
  );
};

export default Project;
