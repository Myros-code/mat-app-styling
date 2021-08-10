/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "react-bootstrap/Modal";

const ModalWindowTitle = (props) => {
  const { editStateTitle, normalStateTitle, isEdit } = props;
  const title = isEdit ? editStateTitle : normalStateTitle;
  return <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>;
};

export default ModalWindowTitle;
