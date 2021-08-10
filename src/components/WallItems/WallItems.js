import React from "react";
import WallItem from "../WallItem/WallItem";
import { Col } from "react-bootstrap";

const WallItems = (props) => {
  const items = props.items.map((wallItem, id) => {
    return (
      <Col
        xl={4}
        xs={12}
        lg={6}
        md={12}
        sm={12}
        key={wallItem.id}
        className="mt-5"
      >
        <WallItem
          editRoomBuildingOpening={props.editRoomBuildingOpening}
          curRoomIdx={props.curRoomIdx}
          curWallIdx={props.curWallIdx}
          itemIdx={id}
          wallItem={wallItem}
        />
      </Col>
    );
  });
  return items;
};

export default WallItems;
