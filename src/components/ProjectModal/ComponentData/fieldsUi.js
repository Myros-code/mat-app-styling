import { Form, Col } from "react-bootstrap";
export const getFieldsUi = (data, handleChange) => {
  return data.map((el, id) => {
    if (id === 1) {
      const options = el.options.map((el, id) => {
        return (
          <option value={el.value} key={id}>
            {el.name}
          </option>
        );
      });

      return (
        <Col key={id} sm={12}>
          <Form.Group>
            <Form.Label>{el.placeholder}</Form.Label>
            <Form.Control
              as={el.type}
              name={el.name}
              value={el.value}
              onChange={handleChange}
            >
              {options}
            </Form.Control>
          </Form.Group>
        </Col>
      );
    } else {
      return (
        <Col key={id} sm={12}>
          <Form.Group>
            <Form.Label>{el.placeholder}</Form.Label>
            <Form.Control
              required
              aria-describedby="inputGroupPrepend"
              type={el.type}
              placeholder={el.placeholder}
              value={el.value}
              name={el.name}
              onChange={handleChange}
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
