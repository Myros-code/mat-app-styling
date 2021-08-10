import React, { useEffect  } from "react";
import Project from "./pages/Project";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import { useDispatch, useSelector } from "react-redux";
import { calculate_project_data } from "./redux/store/project/actions";
import WallPage from "./pages/WallPage";
import AppPersistentDrawerLeft from "./components/AppPresistentDrawer/AppPresistentDrawer";
import StartPage from "./pages/StartPage";
import Report from "./pages/Report";
import Nomograph from "./pages/Nomograph";
import ClearStorageAlertDialog from "./components/ClearStorageAlertDialog/ClearStorageAlertDialog";

const pages = (
  <Switch>
    <Route exact path="/mat-app" component={Project} />
    <Route path="/mat-app/room/:id/wall/:wallId" component={WallPage} />
    <Route path="/mat-app/room/:id/wall" component={WallPage} />
    <Route path="/mat-app/room/:id" component={RoomPage} />
    <Route path="/mat-app/room" component={RoomPage} />
    <Route path="/mat-app/report" component={Report} />
  </Switch>
);

const App = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculate_project_data(rooms));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(calculate_project_data(rooms));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  return (
    <>
      <Switch>
        <Route path="/mat-app">
          <div className="App">
            <AppPersistentDrawerLeft pages={pages} />
          </div>
        </Route>
        <Route path="/nomograph" component={Nomograph} />
        <Route path="/start" component={StartPage} />
        <Redirect from="/" to="/start" />
      </Switch>
      <ClearStorageAlertDialog />
    </>
  );
};

export default App;
