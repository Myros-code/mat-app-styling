import { Modal } from "react-bootstrap";

const ModalWindow = (props) => {
  const {
    modalBodyContent,
    handleSubmit,
    editStateTitle,
    normalStateTitle,
    isEdit,
    show,
    onHide,
  } = props;

  const title = isEdit ? editStateTitle : normalStateTitle;

  return (
    <Modal
      show={show}
      className="modal-window modal-window_wall"
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>{modalBodyContent}</Modal.Body>
        <Modal.Footer>
          <button
            className="button button_close"
            onClick={(e) => {
              e.preventDefault();
              onHide();
            }}
          >
            Cancel
          </button>
          <button
            className="button button_confrim"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalWindow;
