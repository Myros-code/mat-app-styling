import TextInp from "./ModalInputComponents/TextInp";
import SelectInp from "./ModalInputComponents/SelectInp";
import NumberInp from "./ModalInputComponents/NumberInp";
import DropdownInp from "./ModalInputComponents/DropdownInp";
import { Col } from "react-bootstrap";

export const getFieldsUi = (
  data,
  handlerChange,
  handlerDropdownChange,
  handlerTypeChange,
  handlerVariantChange
) => {
  return data.map((el, id) => {
    if (el.type === "text") {
      return (
        <Col key={id} sm={4} xs={6}>
          <TextInp el={el} id={id} handlerChange={handlerChange} />
        </Col>
      );
    }
    if (el.type === "select") {
      return (
        <Col key={id} sm={4} xs={6}>
          <SelectInp
            el={el}
            id={id}
            handlerChange={
              el.name === "exWallGroup"
                ? handlerTypeChange
                : handlerVariantChange
            }
          />
        </Col>
      );
    }
    if (el.type === "number") {
      return (
        <Col key={id} sm={4} xs={6}>
          <NumberInp el={el} id={id} handlerChange={handlerChange} />
        </Col>
      );
    }
    if (el.type === "dropdown") {
      return (
        <Col key={id} sm={12}>
          <DropdownInp id={id} el={el} handlerChange={handlerDropdownChange} />
        </Col>
      );
    }
    return 0;
  });
};
