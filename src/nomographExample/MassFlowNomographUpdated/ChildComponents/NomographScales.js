import React from "react";
import { Line } from "react-konva";
import { minMax2parameter } from "../../coreFunctions";
import { drawScale, getAutoScaleParameter } from "../../scales";
import { stat } from "../../settings";

class NomographScales extends React.Component {
  constructor(props) {
    super(props);
    // calculate parameter for scaleStorageVolume and Outflow
    this.cb = minMax2parameter(
      stat.userSetup.massFlowCalculation.scalePower,
      stat.userSetup.massFlowCalculation.scalePower.min,
      stat.userSetup.massFlowCalculation.scalePower.max
    );

    stat.userSetup.massFlowCalculation.scalePower.m = this.cb.m;
    stat.userSetup.massFlowCalculation.scalePower.n = this.cb.n;
    stat.userSetup.massFlowCalculation.scalePower.p = this.cb.p;
    stat.userSetup.massFlowCalculation.scalePower.q = this.cb.q;

    this.cb = minMax2parameter(
      stat.userSetup.massFlowCalculation.scaleTemperature,
      stat.userSetup.massFlowCalculation.scaleTemperature.min,
      stat.userSetup.massFlowCalculation.scaleTemperature.max
    );

    stat.userSetup.massFlowCalculation.scaleTemperature.m = this.cb.m;
    stat.userSetup.massFlowCalculation.scaleTemperature.n = this.cb.n;
    stat.userSetup.massFlowCalculation.scaleTemperature.p = this.cb.p;
    stat.userSetup.massFlowCalculation.scaleTemperature.q = this.cb.q;

    this.scale = {};

    this.scale[1] = drawScale(stat.userSetup.massFlowCalculation.scalePower);
    this.scale[2] = drawScale(
      stat.userSetup.massFlowCalculation.scaleTemperature
    );

    getAutoScaleParameter({
      scale1: stat.userSetup.massFlowCalculation.scalePower,
      name1: "scalePower",
      scale2: stat.userSetup.massFlowCalculation.scaleTemperature,
      name2: "scaleTemperature",
      scale3: stat.userSetup.massFlowCalculation.scaleVolumeFlow,
      name3: "scaleVolumeFlow",
      calcType: "massFlowRate_volumeFlow",
      nomoName: "massFlowRate",
      verboseLevel: 1,
    });

    this.scale[3] = drawScale(
      stat.userSetup.massFlowCalculation.scaleVolumeFlow
    );

    this.lines = [
      ...this.scale[1].scales,
      ...this.scale[2].scales,
      ...this.scale[3].scales,
    ];
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("Render Nomograph Skales!!!");
    const lines = this.lines;
    return lines.map(function (line, id) {
      return (
        <Line
          draggable={false}
          key={id}
          x={line.x}
          y={line.y}
          points={line.points}
          strokeWidth={line.strokeWidth}
          stroke={line.stroke}
          tension={line.tension}
          bezier={line.bezier}
          opacity={line.opacity}
          fill={line.fill}
          closed={line.closed}
        />
      );
    });
  }
}

export default NomographScales;
