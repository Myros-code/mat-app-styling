import { Form } from "react-bootstrap";

const SelectInp = (props) => {
  const { el, handlerChange } = props;

  const getOptions = () => {
    return el.options.map((el, id) => {
      return (
        <option value={el.name} key={id}>
          {el.name}
        </option>
      );
    });
  };

  const options = getOptions();

  return (
    <Form.Group>
      <Form.Label>{el.placeholder}</Form.Label>
      <Form.Control
        size="sm"
        as={el.type}
        name={el.name}
        value={el.value}
        onChange={handlerChange}
      >
        {options}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectInp;
