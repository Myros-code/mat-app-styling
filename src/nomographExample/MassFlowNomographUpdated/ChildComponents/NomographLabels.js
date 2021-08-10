import React from "react";
import { Text } from "react-konva";
import { drawScale, } from "../../scales";
import { stat } from "../../settings";


class NomographLabels extends React.Component {
  constructor(props) {
    super(props);
    this.scale = {
      1: drawScale(stat.userSetup.massFlowCalculation.scalePower),
      2: drawScale(stat.userSetup.massFlowCalculation.scaleTemperature),
      3: drawScale(stat.userSetup.massFlowCalculation.scaleVolumeFlow),
    };
    this.labels = [
      ...this.scale[1].labels,
      ...this.scale[2].labels,
      ...this.scale[3].labels,
    ];
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("Render Nomograph Labels!!!");
    const labels = this.labels;
    return labels.map(function (label, id) {
      return (
        <Text
          draggable={false}
          key={id}
          x={label.x}
          y={label.y}
          text={label.text}
          align={label.position}
          fontSize={label.fontSize}
          offsetX={label.offsetX}
          offsetY={label.offsetY}
        />
      );
    });
  }
}

export default NomographLabels;
