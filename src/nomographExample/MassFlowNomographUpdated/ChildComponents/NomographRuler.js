import React from "react";
import { Line } from "react-konva";
import {
  drawRuler,
  massFlowCalculation,
  pos2value,
  toUserUnits,
  value2pos,
} from "../../coreFunctions";
import { stat } from "../../settings";

class NomographRuler extends React.Component {
  drawRuller(massFlowCalculationS) {
    const cb = massFlowCalculation({
      scalePower: massFlowCalculationS.power,
      scaleTemperature: massFlowCalculationS.deltaTemp,
      calcType: "massFlowRate_volumeFlow",
      nomoName: "massFlowRate",
      verboseLevel: 0,
    });

    const ruler = drawRuler(
      [
        stat.userSetup.massFlowCalculation.scalePower,
        stat.userSetup.massFlowCalculation.scaleTemperature,
        stat.userSetup.massFlowCalculation.scaleVolumeFlow,
      ],
      [
        toUserUnits(
          cb.power,
          stat.userSetup.massFlowCalculation.scalePower.unit
        ),
        toUserUnits(
          cb.temperature,
          stat.userSetup.massFlowCalculation.scaleTemperature.unit
        ),
        toUserUnits(
          cb.volumeFlow,
          stat.userSetup.massFlowCalculation.scaleVolumeFlow.unit
        ),
      ]
    );

    console.log([
      stat.userSetup.massFlowCalculation.scalePower,
      stat.userSetup.massFlowCalculation.scaleTemperature,
      stat.userSetup.massFlowCalculation.scaleVolumeFlow,
    ]);

    console.log([
      toUserUnits(cb.power, stat.userSetup.massFlowCalculation.scalePower.unit),
    ]);

    console.log([
      toUserUnits(
        cb.temperature,
        stat.userSetup.massFlowCalculation.scaleTemperature.unit
      ),
    ]);

    console.log([
      toUserUnits(
        cb.volumeFlow,
        stat.userSetup.massFlowCalculation.scaleVolumeFlow.unit
      ),
    ]);

    console.log(
      value2pos(
        stat.userSetup.massFlowCalculation.scaleTemperature,
        cb.temperature
      )
    );

    console.log(
      pos2value(stat.userSetup.massFlowCalculation.scaleTemperature, 608)
    );

    console.log(stat.userSetup.massFlowCalculation.scaleTemperature);

    return ruler[0];
  }

  render() {
    console.log("Render Rulerrrrr!!!");
    const ruler = this.drawRuller(this.props.massFlowCalculationS);
    console.log(ruler.points);
    return (
      <Line
        draggable={false}
        x={ruler.x}
        y={ruler.y}
        points={ruler.points}
        strokeWidth={ruler.strokeWidth}
        stroke={ruler.stroke}
        tension={ruler.tension}
        bezier={ruler.bezier}
        opacity={ruler.opacity}
        fill={ruler.fill}
        closed={ruler.closed}
      />
    );
  }
}
export default NomographRuler;
