
import ModalWindow from "../../../common/heatLossCalcCommon/ModalWindow/ModalWindow";

const RoomModalWindow = (props) => {
  const { isEdit, show, onHide, editedRoom } = props;

  const editStateTitle = `Edit room ${editedRoom.name}`;
  const normalStateTitle = "Add a new room";

  return (
    <ModalWindow
      editStateTitle={editStateTitle}
      normalStateTitle={normalStateTitle}
      isEdit={isEdit}
      show={show}
      onHide={onHide}
    />
  );
};

export default RoomModalWindow;
