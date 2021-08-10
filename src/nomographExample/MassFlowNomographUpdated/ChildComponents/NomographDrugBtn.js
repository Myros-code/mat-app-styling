import React from "react";
import { Text, Circle } from "react-konva";
import { pos2value, value2pos } from "../../coreFunctions";
import { stat } from "../../settings";

class NomographDrugBtn extends React.Component {
  state = {
    isDragging: false,
    x: 1228,
    y: 425,
    startPos: value2pos(stat.userSetup.massFlowCalculation.scaleTemperature, 1),
    endPos: value2pos(stat.userSetup.massFlowCalculation.scaleTemperature, 40),
  };

  render() {
    return (
      <Circle
        id={100}
        radius={10}
        stroke={this.state.isDragging ? "rgba(62, 127, 249, 1)" : "black"}
        strokeWidth={2}
        x={this.state.x}
        y={this.state.y}
        // opacity={0.5}
        draggable
        fill={"rgba(62, 127, 249, 0.38)"}
        onDragStart={(el) => {
          console.log(el);
          el.target.moveToTop();
          this.setState({
            isDragging: true,
          });
        }}
        onDragEnd={(e) => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        dragBoundFunc={(pos) => {
          console.log(pos);
          console.log(this.state);
          const currentValue = pos2value(
            stat.userSetup.massFlowCalculation.scaleTemperature,
            pos.y
          );
          console.log(currentValue);
          console.log(currentValue < 1);
          const startPos = value2pos(
            stat.userSetup.massFlowCalculation.scaleTemperature,
            1
          );
          const endPos = value2pos(
            stat.userSetup.massFlowCalculation.scaleTemperature,
            40
          );
          console.log(startPos);
          console.log(endPos);
          const yPos = currentValue < 1 ? startPos : pos.y;
          if (currentValue < 1) {
            this.props.setMassFlowCalculationS(() => {
              return {
                ...this.props.massFlowCalculationS,
                deltaTemp: 1,
              };
            });
            return {
              x: this.state.x,
              y: startPos,
            };
          } else if (currentValue > 40) {
            this.props.setMassFlowCalculationS(() => {
              return {
                ...this.props.massFlowCalculationS,
                deltaTemp: 40,
              };
            });
            return {
              x: this.state.x,
              y: endPos,
            };
          } else {
            this.props.setMassFlowCalculationS(() => {
              return {
                ...this.props.massFlowCalculationS,
                deltaTemp: currentValue,
              };
            });
            return {
              x: this.state.x,
              y: pos.y,
            };
          }
        }}
      />
    );
  }
}

export default NomographDrugBtn;
