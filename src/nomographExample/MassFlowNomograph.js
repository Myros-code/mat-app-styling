//last change: 20210209_00:15

import React, { useEffect, useState } from "react";
import { Stage, Layer, Text, Line } from "react-konva";
import { drawScale, getAutoScaleParameter } from "./scales.js";
import { stat } from "./settings.js";
import {
  minMax2parameter,
  massFlowCalculation,
  toUserUnits,
  drawRuler,
} from "./coreFunctions.js";

export const MassFlowNomograph = function (props) {
  const massFlowCalculationS = props.massFlowCalculationS;
  /*
   * scales on nomograph:
   * stat.userSetup.massFlowCalculation.scalePower (manual)
   * stat.userSetup.massFlowCalculation.scaleTemperature (manual)
   * stat.userSetup.massFlowCalculation.scalePower (auto)
   */

  var i, cb, scaleName;

  if (stat.userSettings.renderWidth > 0) {
    window.innerWidth = stat.userSettings.renderWidth;
  }
  if (stat.userSettings.renderHeight > 0) {
    window.innerHeight = stat.userSettings.renderHeight;
  }

  // calculate parameter for scaleStorageVolume and Outflow
  cb = minMax2parameter(
    stat.userSetup.massFlowCalculation.scalePower,
    stat.userSetup.massFlowCalculation.scalePower.min,
    stat.userSetup.massFlowCalculation.scalePower.max
  );

  stat.userSetup.massFlowCalculation.scalePower.m = cb.m;
  stat.userSetup.massFlowCalculation.scalePower.n = cb.n;
  stat.userSetup.massFlowCalculation.scalePower.p = cb.p;
  stat.userSetup.massFlowCalculation.scalePower.q = cb.q;

  cb = minMax2parameter(
    stat.userSetup.massFlowCalculation.scaleTemperature,
    stat.userSetup.massFlowCalculation.scaleTemperature.min,
    stat.userSetup.massFlowCalculation.scaleTemperature.max
  );

  stat.userSetup.massFlowCalculation.scaleTemperature.m = cb.m;
  stat.userSetup.massFlowCalculation.scaleTemperature.n = cb.n;
  stat.userSetup.massFlowCalculation.scaleTemperature.p = cb.p;
  stat.userSetup.massFlowCalculation.scaleTemperature.q = cb.q;

  var scale = {};

  scale[1] = drawScale(stat.userSetup.massFlowCalculation.scalePower);
  scale[2] = drawScale(stat.userSetup.massFlowCalculation.scaleTemperature);

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

  scale[3] = drawScale(stat.userSetup.massFlowCalculation.scaleVolumeFlow);

  cb = massFlowCalculation({
    scalePower: massFlowCalculationS.power,
    scaleTemperature: massFlowCalculationS.deltaTemp,
    calcType: "massFlowRate_volumeFlow",
    nomoName: "massFlowRate",
    verboseLevel: 0,
  });
  console.log(stat.userSetup.massFlowCalculation);

  console.log(cb);

  console.log(
    "Ruler1 " +
      " Power W: " +
      cb.power +
      " Flowrate m³/s: " +
      cb.volumeFlow +
      " deltaTemp °C: " +
      cb.temperature
  );

  var ruler = drawRuler(
    [
      stat.userSetup.massFlowCalculation.scalePower,
      stat.userSetup.massFlowCalculation.scaleTemperature,
      stat.userSetup.massFlowCalculation.scaleVolumeFlow,
    ],
    [
      toUserUnits(cb.power, stat.userSetup.massFlowCalculation.scalePower.unit),
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

  var allLines = [
    ...scale[1].scales,
    ...scale[2].scales,
    ...scale[3].scales,
    ...ruler,
  ];

  var allLabels = [...scale[1].labels, ...scale[2].labels, ...scale[3].labels];

  const [lines, setLines] = React.useState(allLines);
  const [labels, setlabels] = React.useState(allLabels);

  //ruler, calculate values and insert in userInput
  useEffect(() => {
    console.log("Changes:", massFlowCalculationS.deltaTemp);
    ruler = drawRuler(
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
    scale[1] = drawScale(stat.userSetup.massFlowCalculation.scalePower);
    scale[2] = drawScale(stat.userSetup.massFlowCalculation.scaleTemperature);
    scale[3] = drawScale(stat.userSetup.massFlowCalculation.scaleVolumeFlow);
    setLines([
      ...scale[1].scales,
      ...scale[2].scales,
      ...scale[3].scales,
      ...ruler,
    ]);
    setlabels([...scale[1].labels, ...scale[2].labels, ...scale[3].labels]);
  }, [massFlowCalculationS.deltaTemp]);

  const [width, setWidth] = useState(1000);

  useEffect(() => {
    const newWidth = document.querySelector(
      "#MassFlowNomographContainer"
    ).clientWidth;
    console.log(newWidth);
    document.querySelector(
      ".konvajs-content"
    ).children[0].style.width = `${newWidth}px`;
    console.log(
      (document.querySelector(".konvajs-content").children[0].style.width = 600)
    );
  }, []);

  return (
    //   <Stage width={window.innerWidth} height={window.innerHeight}>
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
              offsetX={label.offsetX}
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
