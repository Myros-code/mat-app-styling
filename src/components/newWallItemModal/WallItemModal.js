/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Row, Figure } from "react-bootstrap";
import {
  add_wallItem_action,
  edit_wallItem_action,
} from "../../redux/store/rooms/actions";
import { useDispatch } from "react-redux";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";
import { getFormData } from "./ComponentData/formData";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import uValueList from "../../uValueList/uValueList.json";

const WallItemModal = (props) => {
  const dispatch = useDispatch();
  const wallTypes = uValueList;

  // state for choosed edited room building element
  const [choosedElement, setChoosedElement] = useState({
    name: "",
    file: "",
    external: false,
    opening: true,
  });

  // initial form values
  const initialFormValues = {
    name: "New openings",
    uValue: 2.1,
    height: 3,
    width: 3,
    exWallGroup: "window",
    exWallGroup1: "Windows with wood or PVC-U frames",
    exWallGroup2: "double, low-E glass, argon filled",
  };

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      const data = getFormData(values, choosedElement);
      if (props.isEdit) {
        dispatch(
          edit_wallItem_action(
            data,
            props.curRoomIdx,
            props.curWallIdx,
            props.editedRoomBuildingOpening.idx
          )
        );
      } else {
        dispatch(add_wallItem_action(data, props.curRoomIdx, props.curWallIdx));
      }
      props.onHide();
    },
  });

  // handler change for dropdown with construction type
  const handlerDropdownChange = (e) => {
    e.preventDefault();
    const choosedElement = e.target;
    const choosedValue = choosedElement.getAttribute("value");
    const element = wallTypes.results.find((el) => {
      return el.group_0 === values.exWallGroup && el.group_1 === choosedValue;
    });
    setFieldValue("exWallGroup1", choosedValue);
    setFieldValue("exWallGroup2", element.group_2);
    setChoosedElement(element);
  };

  const handlerTypeChange = (e) => {
    handleChange(e);
    e.preventDefault();
    const choosedValue = e.target.value;
    const element = wallTypes.results.find((el) => {
      return el.group_0 === choosedValue;
    });
    setFieldValue("exWallGroup1", element.group_1);
    setFieldValue("exWallGroup2", element.group_2);
    setFieldValue("uValue", element.uValue);
    setChoosedElement(element);
  };

  const handlerVariantChange = (e) => {
    handleChange(e);
    e.preventDefault();
    const choosedValue = e.target.value;
    const element = wallTypes.results.find((el) => {
      return (
        el.group_0 === values.exWallGroup &&
        el.group_1 === values.exWallGroup1 &&
        el.group_2 === choosedValue
      );
    });
    setFieldValue("uValue", element.uValue);
    setChoosedElement(element);
  };

  // get fields data and create UI
  const fieldsData = getFieldsData(
    values,
    wallTypes.results,
    choosedElement.external
  );
  const fieldsUi = getFieldsUi(
    fieldsData,
    handleChange,
    handlerDropdownChange,
    handlerTypeChange,
    handlerVariantChange
  );

  // useEffect for reseting form values when modal hide
  useEffect(() => {
    if (!props.show) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [props.show, resetForm]);

  // useEffect for putting in form values of element that user want to edit
  useEffect(() => {
    if (props.isEdit) {
      let choosedRoomBuildingOpeningData = {
        name: props.editedRoomBuildingOpening.name,
        uValue: props.editedRoomBuildingOpening.uValue,
        height: props.editedRoomBuildingOpening.height,
        width: props.editedRoomBuildingOpening.width,
        exWallGroup: props.editedRoomBuildingOpening.exWallGroup,
        exWallGroup1: props.editedRoomBuildingOpening.exWallGroup1,
        exWallGroup2: props.editedRoomBuildingOpening.exWallGroup2,
      };
      console.log(choosedRoomBuildingOpeningData);
      setValues(choosedRoomBuildingOpeningData);

      const element = wallTypes.results.find((el) => {
        return (
          el.group_0 === props.editedRoomBuildingOpening.exWallGroup &&
          el.group_1 === props.editedRoomBuildingOpening.exWallGroup1 &&
          el.group_2 === props.editedRoomBuildingOpening.exWallGroup2
        );
      });
      setChoosedElement(element);
    }
  }, [props.isEdit, setValues]);

  return (
    <Modal
      show={props.show}
      className="modal-window modal-window_wall"
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.isEdit ? `Edit` : "Add"}
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <Row>{fieldsUi}</Row>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="No image"
              src={
                process.env.PUBLIC_URL +
                `/images/WallType/${choosedElement.file}`
              }
            />
            <Figure.Caption>{choosedElement.name}</Figure.Caption>
          </Figure>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button button_close"
            onClick={(e) => {
              e.preventDefault();
              props.onHide();
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

export default WallItemModal;
