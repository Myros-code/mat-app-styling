import { ListItem, ListItemText, Collapse, List } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProjectNav = (props) => {
  const [open, setOpen] = useState(true);
  const { project } = useSelector((state) => state);

  const handleClick = () => {
    setOpen(!open);
  };

  const items = (
    <Collapse in={open} timeout="auto" style={{ paddingLeft: "15px" }}>
      <List component="div" disablePadding>
        <Link to="/mat-app/report">
          <ListItem button>
            <ListItemText primary={"Report"} />
          </ListItem>
        </Link>
        <Link to="/mat-app">
          <ListItem button>
            <ListItemText primary={project.name} />
          </ListItem>
        </Link>
        {props.roomList}
      </List>
    </Collapse>
  );

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={project.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {items}
    </div>
  );
};
export default ProjectNav;
