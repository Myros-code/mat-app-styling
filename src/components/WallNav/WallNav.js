import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const WallNav = (props) => {
  const { prevPageId, nextPageId } = props.navData;

  const goToPage = (id) => {
    props.history.push(`/mat-app/room/${props.roomId}/wall/${id}`);
  };

  const goToHome = () => {
    props.history.push(`/mat-app`);
  };

  const goToRoom = () => {
    props.history.push(`/mat-app/room/${props.roomId}`);
  };

  return (
    <Nav className="nav_room">
      <div className="d-flex">
        <Nav.Item className="mr-2">
          <button className="button" onClick={goToHome}>
            Go to project
          </button>
        </Nav.Item>
        <Nav.Item>
          <button className="button" onClick={goToRoom}>
            Go to room
          </button>
        </Nav.Item>
      </div>
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

export default withRouter(WallNav);
