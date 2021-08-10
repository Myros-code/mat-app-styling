import { Form } from "react-bootstrap";

const SelectInp = (props) => {
  const { el, handlerChange } = props;

  let isDisabled = false;

  if (el.options[0].name === "") {
    isDisabled = true;
  }

  const getOptions = () => {
    return el.options.map((el, id) => {
      return <option key={id}>{el.name}</option>;
    });
  };

  const disabledOption = <option>no results</option>;

  const options = getOptions();

  return (
    <Form.Group>
      <Form.Label>{el.placeholder}</Form.Label>
      <Form.Control
        disabled={isDisabled}
        size="sm"
        as={el.type}
        name={el.name}
        value={el.value}
        onChange={handlerChange}
      >
        {isDisabled ? disabledOption : options}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectInp;
