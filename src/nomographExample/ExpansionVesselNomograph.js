//last change: 20210313_12:00

// ToDo: in expansionVessel2 : eleminate points from calculation, which get x coordinate > scaleExpansionVesselVolume.n
// there is an infinite pole.
// then add regression type   1/sqrt(x), which fits good to this type.
// add regression polynomical-2 and polynomical-3



import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawScale , tableLookup, getAutoScaleParameter} from "./scales.js";
import { stat } from "./settings.js";
import { expansionVesselCalculation, value2pos,minMax2parameter,
	pos2value, toUserUnits, toSiUnits, points2intersection, drawRuler , moveScale} from "./coreFunctions.js";

//definition of the react part may be more elegant made by skilled react user!!


export const ExpansionVessel1 = function() {
	/*
	* scales on nomograph:
	* system Volume
	* P_cold
	* expansionVesselVolume (auto)
	*/
	var i, cb, scaleName, hgName

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.expansionVessel1.scaleSysVolume,
		stat.userSetup.expansionVessel1.scaleSysVolume.min, 
		stat.userSetup.expansionVessel1.scaleSysVolume.max
		)

	stat.userSetup.expansionVessel1.scaleSysVolume.m = 0
	stat.userSetup.expansionVessel1.scaleSysVolume.n = stat.userSetup.expansionVessel1.scaleSysVolume.positionX * window.innerWidth
	stat.userSetup.expansionVessel1.scaleSysVolume.p = cb.p
	stat.userSetup.expansionVessel1.scaleSysVolume.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.expansionVessel1.scalePrechargePressure, 
		stat.userSetup.expansionVessel1.scalePrechargePressure.min, 
		stat.userSetup.expansionVessel1.scalePrechargePressure.max
		)
		
	stat.userSetup.expansionVessel1.scalePrechargePressure.m = 0
	stat.userSetup.expansionVessel1.scalePrechargePressure.n = stat.userSetup.expansionVessel1.scalePrechargePressure.positionX * window.innerWidth
	stat.userSetup.expansionVessel1.scalePrechargePressure.p = cb.p
	stat.userSetup.expansionVessel1.scalePrechargePressure.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.expansionVessel1.scaleSysVolume);
	scale[2] = drawScale(stat.userSetup.expansionVessel1.scalePrechargePressure);


	getAutoScaleParameter({
		scale1 : stat.userSetup.expansionVessel1.scaleSysVolume,
		name1 : 'scaleSysVolume',
		scale2 : stat.userSetup.expansionVessel1.scalePrechargePressure,
		name2 : 'scalePrechargePressure',
		scale3 : stat.userSetup.expansionVessel1.scaleExpansionVesselVolume,
		name3 : 'scaleExpansionVesselVolume',
		calcType : 'expansionVessel_VesselVolume',
		nomoName : 'expansionVessel',
		verboseLevel : 1,
		
	})
		
		
		
		
	scale[3] = drawScale(stat.userSetup.expansionVessel1.scaleExpansionVesselVolume) ;

	
		
    
    
	//ruler, calculate values and insert in userInput

	cb = expansionVesselCalculation({
		scaleSysVolume : stat.userInput.expansionVessel1.systemVolume ,
		scalePrechargePressure : stat.userInput.expansionVessel1.systemPrechargePressure ,
		calcType : 'expansionVessel_VesselVolume',
		nomoName : 'expansionVessel',
		verboseLevel : 0
	})	

console.log(cb)

	console.log( 'Ruler1 ' +
		' System Volume: ' + cb.systemVolume +
		' Expansion Vessel Volume: ' + cb.expansionVesselVolume +
		' Precharge Pressure: ' + cb.prechargePressure +
		' Max Temp: ' + cb.maxTemp
		)


	var ruler = drawRuler([
		stat.userSetup.expansionVessel1.scaleSysVolume,
		stat.userSetup.expansionVessel1.scaleExpansionVesselVolume,
		stat.userSetup.expansionVessel1.scalePrechargePressure],
		[
		toUserUnits( cb.systemVolume , stat.userSetup.expansionVessel1.scaleSysVolume.unit ),
		toUserUnits( cb.expansionVesselVolume ,stat.userSetup.expansionVessel1.scaleExpansionVesselVolume.unit ),
		toUserUnits( cb.prechargePressure ,stat.userSetup.expansionVessel1.scalePrechargePressure.unit ),
		]
		);

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	];






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

export const ExpansionVessel2 = function() {
	/*
	* scales on nomograph:
	* system Volume
	* expansionVesselVolume
	* maximumTemperature (auto)
	*/
	var i, cb, scaleName, hgName

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.expansionVessel2.scaleSysVolume,
		stat.userSetup.expansionVessel2.scaleSysVolume.min, 
		stat.userSetup.expansionVessel2.scaleSysVolume.max
		)

	stat.userSetup.expansionVessel2.scaleSysVolume.m = 0
	stat.userSetup.expansionVessel2.scaleSysVolume.n = stat.userSetup.expansionVessel2.scaleSysVolume.positionX * window.innerWidth
	stat.userSetup.expansionVessel2.scaleSysVolume.p = cb.p
	stat.userSetup.expansionVessel2.scaleSysVolume.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.expansionVessel2.scaleExpansionVesselVolume, 
		stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.min, 
		stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.max
		)
		
	stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.m = 0
	stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.n = stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.positionX * window.innerWidth
	stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.p = cb.p
	stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.expansionVessel2.scaleSysVolume);
	scale[2] = drawScale(stat.userSetup.expansionVessel2.scaleExpansionVesselVolume);


	getAutoScaleParameter({
		scale1 : stat.userSetup.expansionVessel2.scaleSysVolume,
		name1 : 'scaleSysVolume',
		scale2 : stat.userSetup.expansionVessel2.scaleExpansionVesselVolume,
		name2 : 'scaleExpansionVesselVolume',
		scale3 : stat.userSetup.expansionVessel2.scaleMaximumTemp,
		name3 : 'scaleMaximumTemp',
		calcType : 'expansionVessel_MaximumTemperature',
		nomoName : 'expansionVessel',
		verboseLevel : 1,
		
	})

		
		
		
	scale[3] = drawScale(stat.userSetup.expansionVessel2.scaleMaximumTemp) ;

	
	
		
    
    
	//ruler, calculate values and insert in userInput
	cb = expansionVesselCalculation({
		scaleSysVolume : stat.userInput.expansionVessel2.systemVolume,
		scaleExpansionVesselVolume : stat.userInput.expansionVessel2.expansionVesselVolume,
		calcType : 'expansionVessel_MaximumTemperature',
		nomoName : 'expansionVessel',
		verboseLevel : 0
	})

	console.log(cb)


	console.log( 'Ruler2 ' +
		' System Volume: ' + cb.systemVolume +
		' Max Temp: ' + cb.maxTemp +
		' Expansion Vessel Volume: ' + cb.expansionVesselVolume +
		' Maximum Temperature: ' + cb.prechargePressure
		)


	var ruler = drawRuler([
		stat.userSetup.expansionVessel2.scaleSysVolume,
		stat.userSetup.expansionVessel2.scaleMaximumTemp,
		stat.userSetup.expansionVessel2.scaleExpansionVesselVolume,
		],
		[
		toUserUnits( cb.systemVolume , stat.userSetup.expansionVessel2.scaleSysVolume.unit ),
		toUserUnits( cb.maxTemp ,stat.userSetup.expansionVessel2.scaleMaximumTemp.unit ),
		toUserUnits( cb.expansionVesselVolume ,stat.userSetup.expansionVessel2.scaleExpansionVesselVolume.unit ),
		]
		);

console.log(scale[1])

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	];






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
