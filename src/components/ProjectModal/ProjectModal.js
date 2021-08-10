import { Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { edit_project_action } from "../../redux/store/project/actions";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";
import { getFormData } from "./ComponentData/formData";
import { useFormik } from "formik";

const ProjectModal = (props) => {
  const { project } = props;
  const dispatch = useDispatch();

  // initial values for formik form
  // gives from project state
  const initialFormValues = {
    name: project.name,
    outsideT: project.outsideT,
    groundT: project.groundT,
    dDays: project.dDays,
    buildingType: project.buildingType,
  };

  // use formik hook
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: initialFormValues,

    onSubmit: (values) => {
      const data = getFormData(values);
      dispatch(edit_project_action(data));
      props.onHide();
    },
  });

  // get fields data and create UI
  const fieldsData = getFieldsData(values);
  const fieldsUi = getFieldsUi(fieldsData, handleChange);

  return (
    <Modal
      className="modal-window modal-window_project"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit project data
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <Row>{fieldsUi}</Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="button button_close" onClick={props.onHide}>
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
export default ProjectModal;
