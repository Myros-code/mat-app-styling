/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Row, Figure } from "react-bootstrap";
import {
  add_item_action,
  edit_item_action,
} from "../../redux/store/rooms/actions";
import { useDispatch } from "react-redux";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";
import { getFormData } from "./ComponentData/formData";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import uValueList from "../../uValueList/uValueList.json";

const RoomItemModal = (props) => {
  const dispatch = useDispatch();
  const wallTypes = uValueList;

  // state for choosed edited room building element
  const [choosedElement, setChoosedElement] = useState({
    name: "102 mm brick, plaster",
    file: "Lightweight_Plaster_Brick_single_Lightweight_Plaster.png",
    external: true,
    openings: false,
  });

  // initial form values
  const initialFormValues = {
    name: "",
    uValue: 3.1,
    height: props.room.height,
    length: props.room.length,
    width: props.room.width,
    area: props.room.area,
    tempNroom: 15,
    expPerimeter: 0,
    floorArea: props.room.area,
    thermInsul: 0.04,
    thickInsul: 0,
    exWallGroup: "external wall",
    exWallGroup1: "Solid brick wall, dense plaster",
    exWallGroup2: "102 mm brick",
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
      const data = getFormData(values, choosedElement, props.room.type);
      if (props.isEdit) {
        dispatch(
          edit_item_action(
            props.roomId.toString(),
            props.editedRoomBuilding.id.toString(),
            data
          )
        );
      } else {
        data.id = uuidv4();
        dispatch(add_item_action(data, props.pos));
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
    if (choosedValue !== "ground floor") {
      const element = wallTypes.results.find((el) => {
        return el.group_0 === choosedValue;
      });
      setFieldValue("exWallGroup1", element.group_1);
      setFieldValue("exWallGroup2", element.group_2);
      setFieldValue("uValue", element.uValue);
      setChoosedElement(element);
    }
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
    choosedElement.external,
    props.room
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
      let choosedRoomBuildingData = {};
      if (props.editedRoomBuilding.exWallGroup === "ground floor") {
        choosedRoomBuildingData = {
          name: props.editedRoomBuilding.name,
          uValue: 0,
          length: props.editedRoomBuilding.length,
          width: props.editedRoomBuilding.width,
          area: props.editedRoomBuilding.area,
          tempNroom: 0,
          expPerimeter: props.editedRoomBuilding.expPerimeter,
          floorArea: props.editedRoomBuilding.floorArea,
          thermInsul: props.editedRoomBuilding.thermInsul,
          thickInsul: props.editedRoomBuilding.thickInsul,
          exWallGroup: props.editedRoomBuilding.exWallGroup,
          exWallGroup1: "",
          exWallGroup2: "",
        };
      } else if (props.editedRoomBuilding.exWallGroup === "roof") {
        choosedRoomBuildingData = {
          name: props.editedRoomBuilding.name,
          uValue: props.editedRoomBuilding.uValue,
          length: props.editedRoomBuilding.length,
          width: props.editedRoomBuilding.width,
          area: props.editedRoomBuilding.area,
          tempNroom: props.editedRoomBuilding.tempNroom,
          expPerimeter: 0,
          floorArea: 0,
          thermInsul: 0,
          thickInsul: 0,
          exWallGroup: props.editedRoomBuilding.exWallGroup,
          exWallGroup1: props.editedRoomBuilding.exWallGroup1,
          exWallGroup2: props.editedRoomBuilding.exWallGroup2,
        };
        const element = wallTypes.results.find((el) => {
          return (
            el.group_0 === props.editedRoomBuilding.exWallGroup &&
            el.group_1 === props.editedRoomBuilding.exWallGroup1 &&
            el.group_2 === props.editedRoomBuilding.exWallGroup2
          );
        });
        setChoosedElement(element);
      } else {
        choosedRoomBuildingData = {
          name: props.editedRoomBuilding.name,
          uValue: props.editedRoomBuilding.uValue,
          length: props.editedRoomBuilding.length,
          height: props.editedRoomBuilding.height,
          area: props.editedRoomBuilding.area,
          tempNroom: props.editedRoomBuilding.tempNroom,
          expPerimeter: 0,
          floorArea: 0,
          thermInsul: 0,
          thickInsul: 0,
          exWallGroup: props.editedRoomBuilding.exWallGroup,
          exWallGroup1: props.editedRoomBuilding.exWallGroup1,
          exWallGroup2: props.editedRoomBuilding.exWallGroup2,
        };
        const element = wallTypes.results.find((el) => {
          return (
            el.group_0 === props.editedRoomBuilding.exWallGroup &&
            el.group_1 === props.editedRoomBuilding.exWallGroup1 &&
            el.group_2 === props.editedRoomBuilding.exWallGroup2
          );
        });
        setChoosedElement(element);
      }
      setValues(choosedRoomBuildingData);
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
          {props.isEdit
            ? `Edit room № building element №`
            : "Add a new building element"}
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <Row>{fieldsUi}</Row>
          {values.exWallGroup === "ground floor" ? (
            ""
          ) : (
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
          )}
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

export default RoomItemModal;
