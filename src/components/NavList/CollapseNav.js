import { ListItem, ListItemText, Collapse, List } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const CollapseNav = (props) => {
  const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
      fontSize: "0.8rem",
    },
    navText: {
      fontSize: "0.8rem",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const selfRoom = (
    <Link to={`/mat-app/room/${props.navItem.id}`}>
      <ListItem button className={classes.nested}>
        <ListItemText
          primary={props.navItem.name}
          className={classes.navText}
        />
      </ListItem>
    </Link>
  );

  const renderItems = props.navItem.items.map((el, id) => {
    return (
      <Link to={`/mat-app/room/${props.navItem.id}/wall/${el.id}`} key={id}>
        <ListItem button className={classes.nested}>
          <ListItemText primary={el.name} className={classes.navText} />
        </ListItem>
      </Link>
    );
  });

  const items = (
    <Collapse in={open} timeout="auto">
      <List component="div" disablePadding>
        {selfRoom}
        {renderItems}
      </List>
    </Collapse>
  );

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary={props.navItem.name}
          className={classes.navText}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {items}
    </div>
  );
};
export default CollapseNav;
