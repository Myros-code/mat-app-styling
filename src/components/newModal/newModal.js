/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { getFieldsData } from "./ComponentData/fieldsData";
import { getFieldsUi } from "./ComponentData/fieldsUi";
import { getFormData } from "./ComponentData/formData";
import { reheatData } from "./reheatData";
import {
  add_room_action,
  edit_room_action,
} from "../../redux/store/rooms/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const NewModal = (props) => {
  const { show, editedRoom, isEdit, onHide } = props;
  console.log(editedRoom);
  const dispatch = useDispatch();


  // state for Value - heating power
  const [heatPower, setheatPower] = useState(0);

  // initial form values
  const initialFormValues = {
    name: "",
    type: "Simple room",
    roomT: "",
    airExRate: "",
    width: "",
    area: "",
    height: "",
    length: "",
    disusePeriod: 8,
    bAir: "low",
    bMass: "low",
    reheatTime: 0.5,
  };

  const { handleSubmit, handleChange, values, resetForm, setValues } =
    useFormik({
      initialValues: initialFormValues,

      onSubmit: (values) => {
        const roomData = getFormData(values, heatPower);
        console.log(roomData);
        isEdit
          ? dispatch(edit_room_action(editedRoom.id, roomData))
          : dispatch(add_room_action(roomData));
        onHide();
      },
    });

  const reheatLabels = {
    reheatTime: values.reheatTime,
    disusePeriod: values.disusePeriod,
    bAir: values.bAir,
    bMass: values.bMass,
  };

  const calculateHeating = (reheatObj, labels) => {
    if (Number(labels.disusePeriod) === 168) {
      labels.bAir = "-";
    }

    return reheatObj[labels.disusePeriod][labels.bAir][labels.bMass][
      labels.reheatTime
    ];
  };

  //useEffect for calculate heating when component mount
  useEffect(() => {
    setheatPower(calculateHeating(reheatData, reheatLabels));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [show, resetForm]);

  useEffect(() => {
    if (isEdit) {
      let choosedRoomData = {};
      if (editedRoom.type === "Simple room") {
        choosedRoomData = {
          name: editedRoom.name,
          type: editedRoom.type,
          roomT: editedRoom.roomT,
          airExRate: editedRoom.airExRate,
          width: editedRoom.width,
          area: 0,
          height: editedRoom.height,
          length: editedRoom.length,
          disusePeriod: editedRoom.disusePeriod,
          bAir: editedRoom.bAir,
          bMass: editedRoom.bMass,
          reheatTime: editedRoom.reheatTime,
        };
      } else {
        choosedRoomData = {
          name: editedRoom.name,
          type: editedRoom.type,
          roomT: editedRoom.roomT,
          airExRate: editedRoom.airExRate,
          width: 0,
          area: editedRoom.area,
          height: editedRoom.height,
          length: 0,
          disusePeriod: editedRoom.disusePeriod,
          bAir: editedRoom.bAir,
          bMass: editedRoom.bMass,
          reheatTime: editedRoom.reheatTime,
        };
      }
      setValues(choosedRoomData);
    } else {
      console.log("not edit");
    }
  }, [isEdit, setValues]);

  //useEffect for calculate heating when data changes
  useEffect(() => {
    setheatPower(calculateHeating(reheatData, reheatLabels));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.reheatTime, values.disusePeriod, values.bAir, values.bMass]);

  //get fields data and create UI
  const fieldsData = getFieldsData(values);
  const fieldsUi = getFieldsUi(fieldsData, handleChange);

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="modal-window modal-window_room"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-tit le-vcenter">
          {isEdit ? `Edit room ${editedRoom.name}` : "Add a new room"}
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <Row>{fieldsUi}</Row>
          <Row>
            <Col sm={12} className="card__label">
              {"Specific heating-up power"}:{"   "}
              {heatPower}
              {"  [W/m²]"}
            </Col>
          </Row>
        </Modal.Body>
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
            onClick={handleSubmit}
            type="submit"
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

NewModal.propTypes = {
  editedRoom: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    roomT: PropTypes.number,
    airExRate: PropTypes.number,
    width: PropTypes.number,
    area: PropTypes.number,
    height: PropTypes.number,
    length: PropTypes.number,
    disusePeriod: PropTypes.number,
    bAir: PropTypes.string,
    bMass: PropTypes.string,
    reheatTime: PropTypes.number,
  }),
  isEdit: PropTypes.bool,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default NewModal;
