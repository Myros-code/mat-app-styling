import { Form } from "react-bootstrap";

const TextInp = (props) => {
  const { el, handlerChange } = props;
  return (
    <Form.Group>
      <Form.Label>{el.placeholder}</Form.Label>
      <Form.Control
        size="sm"
        type={el.type}
        placeholder={el.placeholder}
        value={el.value}
        name={el.name}
        onChange={handlerChange}
      />
    </Form.Group>
  );
};

export default TextInp;
