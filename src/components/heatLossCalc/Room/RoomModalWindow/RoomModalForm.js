/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import {
  add_room_action,
  edit_room_action,
} from "../../redux/store/rooms/actions";
import { useDispatch } from "react-redux";
import { getFormData } from "./functions/getFormData";
import { getFormUi } from "./functions/getFormUi";

const RoomModalForm = (props) => {
  const { editedRoom, isEdit, onHide } = props;
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

  //get fields data and create UI
  const formData = getFormData(values);
  const formUi = getFormUi(formData, handleChange);

  return (
    <>
      <Row>{formUi}</Row>
      <Row>
        <Col sm={12} className="card__label">
          {"Specific heating-up power"}:{"   "}
          {heatPower}
          {"  [W/m²]"}
        </Col>
      </Row>
    </>
  );
};

export default RoomModalForm;
