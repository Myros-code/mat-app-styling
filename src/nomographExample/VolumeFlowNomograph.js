//last change: 20210201_14:00

import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawLinScale, drawPowScale, drawInvPowScale, drawAtanScale, drawTableScale } from "./scales.js";
import { userSetup, userInput, userSettings } from "./settings.js";
import { radiatorCalculation, value2pos,minMax2parameter,
	pos2value, toUserUnits, toSiUnits, points2intersection, points2parameter } from "./coreFunctions.js";


if (userSettings.renderWidth > 0 ){
	window.innerWidth = userSettings.renderWidth
	}
if (userSettings.renderHeight > 0){
	window.innerHeight = userSettings.renderHeight
}


// calculate parameter for Inflow and Outflow
var cb

cb = minMax2parameter(
	userSetup.massFlowCalculation.scalePower, 
	userSetup.massFlowCalculation.scalePower.min, 
	userSetup.massFlowCalculation.scalePower.max
	)

userSetup.massFlowCalculation.scalePower.m = 0
userSetup.massFlowCalculation.scalePower.n = userSetup.massFlowCalculation.scalePower.positionX * window.innerWidth
userSetup.massFlowCalculation.scalePower.p = cb.p
userSetup.massFlowCalculation.scalePower.q = cb.q


cb = minMax2parameter(
	userSetup.massFlowCalculation.scaleTemperature, 
	userSetup.massFlowCalculation.scaleTemperature.min, 
	userSetup.massFlowCalculation.scaleTemperature.max
	)
	
userSetup.massFlowCalculation.scaleTemperature.m = 0
userSetup.massFlowCalculation.scaleTemperature.n = userSetup.massFlowCalculation.scaleTemperature.positionX * window.innerWidth
userSetup.massFlowCalculation.scaleTemperature.p = cb.p
userSetup.massFlowCalculation.scaleTemperature.q = cb.q


var scale1 = drawLogScale('scalePower', 'massFlowCalculation');
//var scale2 = drawLinScale('scaleOutflow', 'radiatorCalculation');
var scale3 = drawLogScale('scaleTemperature', 'massFlowCalculation');



var allLines = [
  ...scale1.scales,
//  ...scale2.scales,
  ...scale3.scales,
  ...ruler
];


var allLabels = [
  ...scale1.labels,
//  ...scale2.labels,
  ...scale3.labels,
];


//definition of the react part may be more elegant made by skilled react user!!
const MassFlowNomograph = function() {
  const [lines] = React.useState(allLines);
  const [labels] = React.useState(allLabels);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>

        {labels.map(function (label) {
          return (
            <Text
              x={label.x}
              y={label.y}
              text={label.text}
              align={label.position}
              fontSize={label.fontSize}
              offsetY={label.offsetY}
            />
          );
        })}

        {lines.map(function (line) {
          return (
            <Line
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
        })}
      </Layer>
    </Stage>
  );
};

export default MassFlowNomograph;
