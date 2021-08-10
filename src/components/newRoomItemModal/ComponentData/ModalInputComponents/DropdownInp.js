import { Form, Dropdown } from "react-bootstrap";

const DropdownInp = (props) => {
  const { el, handlerChange } = props;

  const options = el.items.map((el, id) => {
    return (
      <Dropdown.Item
        className="wall-dropdown-item"
        key={id}
        value={el.option}
        img={el.img}
        name="exWallGroup1"
        onClick={handlerChange}
      >
        <img
          alt="wall item img"
          src={process.env.PUBLIC_URL + `/images/WallType/${el.img}`}
          style={{ width: "250px", height: "200px" }}
          className="mr-2"
        />
        {el.option}
      </Dropdown.Item>
    );
  });

  return (
    <Form.Group>
      <Form.Label>Construction type</Form.Label>
      <Dropdown style={{ width: "100%" }}>
        <Dropdown.Toggle
          style={{ width: "100%" }}
          id="dropdown-basic"
          className="items-type-dropdown-btn"
        >
          <div className="items-type-dropdown-btn__content">
            Select construction type
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="modal-window__dropdown-menu" style={{ width: "100%" }}>{options}</Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

export default DropdownInp;
