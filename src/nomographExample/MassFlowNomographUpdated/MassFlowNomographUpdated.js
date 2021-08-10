//last change: 20210209_00:15
import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import NomographScales from "./ChildComponents/NomographScales.js";
import NomographRuler from "./ChildComponents/NomographRuler.js";
import NomographLabels from "./ChildComponents/NomographLabels.js";
import { stat } from "../settings.js";
import NomographDrugBtn from "./ChildComponents/NomographDrugBtn.js";

export const MassFlowNomographUpdated = (props) => {
  if (stat.userSettings.renderWidth > 0) {
    window.innerWidth = stat.userSettings.renderWidth;
  }
  if (stat.userSettings.renderHeight > 0) {
    window.innerHeight = stat.userSettings.renderHeight;
  }

  // useEffect(() => {
  //   const newWidth = document.querySelector(
  //     "#MassFlowNomographContainer"
  //   ).clientWidth;
  //   document.querySelector(
  //     ".konvajs-content"
  //   ).children[0].style.width = `${newWidth}px`;
  // }, []);

  console.log("Render Nomograph !!!");

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <NomographDrugBtn
          setMassFlowCalculationS={props.setMassFlowCalculationS}
          massFlowCalculationS={props.massFlowCalculationS}
        />
        <NomographScales />
        <NomographRuler
          massFlowCalculationS={props.massFlowCalculationS}
          temp={props.massFlowCalculationS.deltaTemp}
        />
        <NomographLabels />
      </Layer>
    </Stage>
  );
};
