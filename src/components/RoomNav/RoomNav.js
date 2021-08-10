import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const RoomNav = (props) => {
  const { prevPageId, nextPageId } = props.navData;

  const goToPage = (id) => {
    props.history.push(`/mat-app/room/${id}`);
  };

  const goToHome = () => {
    props.history.push(`/mat-app`);
  };

  return (
    <Nav className="nav_room">
      <Nav.Item>
        <button className="button" onClick={goToHome}>
          Go to project
        </button>
      </Nav.Item>
      <div className="d-flex">
        <Nav.Item className="mr-2">
          <button
            className="button"
            onClick={() => {
              goToPage(prevPageId);
            }}
          >
            Prev
          </button>
        </Nav.Item>
        <Nav.Item>
          <button
            className="button"
            onClick={() => {
              goToPage(nextPageId);
            }}
          >
            Next
          </button>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default withRouter(RoomNav);
