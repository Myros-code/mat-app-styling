import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, List } from "@material-ui/core";
import { useSelector } from "react-redux";
import CollapseNav from "./CollapseNav";
import ProjectNav from "./ProjectNav";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  navText: {
    fontSize: "0.8rem",
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms);

  const roomsNav = () => {
    return rooms.map((el, id) => {
      return <CollapseNav navItem={el} key={id} />;
    });
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Link to={`/start`}>
        <ListItem button className={classes.nested}>
          <ListItemText primary={"App menu"} className={classes.navText} />
        </ListItem>
      </Link>
      <ProjectNav roomList={roomsNav()} />
    </List>
  );
}
