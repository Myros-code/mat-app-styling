import { Form, Col, Row } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
export const getFieldsUi = (data, handlerChange) => {
  return data.map((el, id) => {
    if (el.type === "select") {
      const options = el.options.map((el, id) => {
        return (
          <option value={el.value} key={id}>
            {el.name}
          </option>
        );
      });
      return (
        <Col sm={6} key={id}>
          <Form.Group>
            <Form.Label>{el.placeholder}</Form.Label>
            <Form.Control
              as={el.type}
              size="sm"
              name={el.name}
              value={el.value}
              onChange={handlerChange}
            >
              {options}
            </Form.Control>
          </Form.Group>
        </Col>
      );
    } else if (el.type === "response capacity divider") {
      return (
        <Col
          sm={12}
          key={id}
          style={{
            marginBottom: "10px",
            textAlign: "end",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Response capacity
          <Divider style={{ backgroundColor: "#002171", height: "2px" }} />
        </Col>
      );
    } else if (el.type === "number") {
      return (
        <Col sm={6} key={id}>
          <Form.Group>
            <Form.Label>{el.placeholder}</Form.Label>
            <Form.Control
              required
              aria-describedby="inputGroupPrepend"
              subtype={el.subType}
              size="sm"
              type={el.type}
              step={el.step}
              placeholder={el.placeholder}
              value={el.value}
              name={el.name}
              onChange={handlerChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter data
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      );
    } else if (el.name === "heatingPover") {
      return (
        <Col sm={el.col} className="" key={id}>
          <Row className={el.class}>
            <Col sm={el.colN} className="card__label">
              {el.placeholder}:{"   "}
              {el.value}
              {"  [W/m²]"}
            </Col>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col sm={6} key={id}>
          <Form.Group>
            <Form.Label>{el.placeholder}</Form.Label>
            <Form.Control
              required
              size="sm"
              aria-describedby="inputGroupPrepend"
              subtype={el.subType}
              type={el.type}
              placeholder={el.placeholder}
              value={el.value}
              name={el.name}
              onChange={handlerChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter data
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      );
    }
  });
};
