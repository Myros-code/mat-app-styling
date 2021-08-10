//last change: 20210405_14:00

import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
//import { drawLogScale , drawTableScale, tableLookup, logTesselation, linTesselation} from "./scales.js";
import { drawScale , tableLookup, getAutoScaleParameter, getTwinScaleParameter} from "./scales.js";

import { stat } from "./settings.js";
import { pipeCalculation, points2parameter, value2pos,
				 minMax2parameter, toSiUnits, toUserUnits, pos2value,
				 points2intersection , drawRuler} from "./coreFunctions.js";
import { brine } from "./brine.js";





	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}

// PipeNomograph 1 is deprecated version!!

export const PipeNomograph1 = function() {
	
	
	var i, cb, scaleName
			var scale = {}
	cb = minMax2parameter(
		stat.userSetup.pipeCalculation.scaleDiameter,
		stat.userSetup.pipeCalculation.scaleDiameter.min, 
		stat.userSetup.pipeCalculation.scaleDiameter.max
		)

	stat.userSetup.pipeCalculation.scaleDiameter.m = 0
	stat.userSetup.pipeCalculation.scaleDiameter.n = cb.n
	stat.userSetup.pipeCalculation.scaleDiameter.p = cb.p
	stat.userSetup.pipeCalculation.scaleDiameter.q = cb.q	

	cb = minMax2parameter(
		stat.userSetup.pipeCalculation.scaleFlowRate,
		stat.userSetup.pipeCalculation.scaleFlowRate.min, 
		stat.userSetup.pipeCalculation.scaleFlowRate.max
		)

	stat.userSetup.pipeCalculation.scaleFlowRate.m = 0
	stat.userSetup.pipeCalculation.scaleFlowRate.n = cb.n
	stat.userSetup.pipeCalculation.scaleFlowRate.p = cb.p
	stat.userSetup.pipeCalculation.scaleFlowRate.q = cb.q	

	scale[1] = drawScale(stat.userSetup.pipeCalculation.scaleDiameter);
	scale[2] = drawScale(stat.userSetup.pipeCalculation.scaleFlowRate);


// twin scale - flowrate, power

	var cp = brine(
		stat.userInput.pipeCalculation.brineType, 
		'cp', 
		stat.userInput.pipeCalculation.temperature, 
		stat.userInput.pipeCalculation.brineRatio
		);		
	var rho = brine(
		stat.userInput.pipeCalculation.brineType, 
		'rho', 
		stat.userInput.pipeCalculation.temperature, 
		stat.userInput.pipeCalculation.brineRatio
		);		


	cb = getTwinScaleParameter({
		scale1 : stat.userSetup.pipeCalculation.scaleFlowRate,
		name1 : 'scaleFlowRate',
		scale2 : stat.userSetup.pipeCalculation.scalePower,
		name2 : 'scalePower',
		nomoName : 'pipeCalculation',
		factor : cp * rho * stat.userInput.pipeCalculation.deltaTemp 
				* toSiUnits(1 , stat.userSetup.pipeCalculation.scaleFlowRate.unit) 
				/ toSiUnits(1 , stat.userSetup.pipeCalculation.scalePower.unit),
		verboseLevel : 0,
	})

// make a copy of scale
	stat.userSetup.pipeCalculation.scalePower = JSON.parse( JSON.stringify(cb,null,2) )
	scale[3] = drawScale(stat.userSetup.pipeCalculation.scalePower) ;

// scale for velocity

	getAutoScaleParameter({
		scale1 : stat.userSetup.pipeCalculation.scaleDiameter,
		name1 : 'scaleDiameter',
		scale2 : stat.userSetup.pipeCalculation.scaleFlowRate,
		name2 : 'scaleFlowRate',
		scale3 : stat.userSetup.pipeCalculation.scaleVelocity,
		name3 : 'scaleVelocity',
		calcType : 'pipeCalculation_velocity',
		nomoName : 'pipeCalculation',
		verboseLevel : 1,
	})
	scale[4] = drawScale(stat.userSetup.pipeCalculation.scaleVelocity) ;


	getAutoScaleParameter({
		scale1 : stat.userSetup.pipeCalculation.scaleDiameter,
		name1 : 'scaleDiameter',
		scale2 : stat.userSetup.pipeCalculation.scaleFlowRate,
		name2 : 'scaleFlowRate',
		scale3 : stat.userSetup.pipeCalculation.scalePressureDrop,
		name3 : 'scalePressureDrop',
		calcType : 'pipeCalculation_pressureDrop',
		nomoName : 'pipeCalculation',
		verboseLevel : 1,
	})
	scale[5] = drawScale(stat.userSetup.pipeCalculation.scalePressureDrop) ;



	cb = getTwinScaleParameter({
		scale1 : stat.userSetup.pipeCalculation.scalePressureDrop,
		name1 : 'scalePressureDrop',
		scale2 : stat.userSetup.pipeCalculation.scalePressureDrop2,
		name2 : 'scalePressureDrop2',
		nomoName : 'pipeCalculation',
		factor : stat.userSetup.pipeCalculation.scalePressureDrop2.factor,
		verboseLevel : 0,
	})
	stat.userSetup.pipeCalculation.scalePressureDrop2 = JSON.parse( JSON.stringify(cb,null,2) )
	scale[6] = drawScale(stat.userSetup.pipeCalculation.scalePressureDrop2) ;


// here comes the ruler !!

	cb = pipeCalculation({
		scaleDiameter : stat.userInput.pipeCalculation.pipeDiameter ,
		scaleFlowRate : stat.userInput.pipeCalculation.flowRate ,
		calcType : 'pipeCalculation_pressureDrop',
		nomoName : 'pipeCalculation',
		verboseLevel : 0
	})	

console.log(cb)
		

	console.log( 'Ruler1 ' +
		' dP: ' + cb.pressureDrop +
		' v: ' + cb.velocity +
		' flowRate: ' + cb.flowRate +
		' diameter: ' + cb.diameter
		)


	var ruler = drawRuler([
		stat.userSetup.pipeCalculation.scalePressureDrop,
		stat.userSetup.pipeCalculation.scaleVelocity,
		stat.userSetup.pipeCalculation.scaleFlowRate,
		stat.userSetup.pipeCalculation.scaleDiameter,
		],
		[
		toUserUnits( cb.pressureDrop , stat.userSetup.pipeCalculation.scalePressureDrop.unit ),
		toUserUnits( cb.velocity ,stat.userSetup.pipeCalculation.scaleVelocity.unit ),
		toUserUnits( cb.flowRate ,stat.userSetup.pipeCalculation.scaleFlowRate.unit ),
		toUserUnits( cb.diameter ,stat.userSetup.pipeCalculation.scaleDiameter.unit ),
		]
		);



	var allLines = [
		...scale[1].scales,
		...scale[2].scales,
		...scale[3].scales,
		...scale[4].scales,
		...scale[5].scales,
		...scale[6].scales,
		...ruler,
//		...polygon
	];

	var allLabels = [
		...scale[1].labels,
		...scale[2].labels,
		...scale[3].labels,
		...scale[4].labels,
		...scale[5].labels,
		...scale[6].labels,
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



}

export const PipeNomograph2 = function(){
	// nomograph , which shows : length / diameter / volume of pipe
	var i, cb, scaleName
	var scale = {}
	cb = minMax2parameter(
		stat.userSetup.pipeCalculation2.scaleDiameter,
		stat.userSetup.pipeCalculation2.scaleDiameter.min, 
		stat.userSetup.pipeCalculation2.scaleDiameter.max
		)

	stat.userSetup.pipeCalculation2.scaleDiameter.m = 0
	stat.userSetup.pipeCalculation2.scaleDiameter.n = cb.n
	stat.userSetup.pipeCalculation2.scaleDiameter.p = cb.p
	stat.userSetup.pipeCalculation2.scaleDiameter.q = cb.q	

	cb = minMax2parameter(
		stat.userSetup.pipeCalculation2.scalePipeLength,
		stat.userSetup.pipeCalculation2.scalePipeLength.min, 
		stat.userSetup.pipeCalculation2.scalePipeLength.max
		)

	stat.userSetup.pipeCalculation2.scalePipeLength.m = 0
	stat.userSetup.pipeCalculation2.scalePipeLength.n = cb.n
	stat.userSetup.pipeCalculation2.scalePipeLength.p = cb.p
	stat.userSetup.pipeCalculation2.scalePipeLength.q = cb.q	

	scale[1] = drawScale(stat.userSetup.pipeCalculation2.scaleDiameter);
	scale[2] = drawScale(stat.userSetup.pipeCalculation2.scalePipeLength);

	getAutoScaleParameter({
		scale1 : stat.userSetup.pipeCalculation2.scaleDiameter,
		name1 : 'scaleDiameter',
		scale2 : stat.userSetup.pipeCalculation2.scalePipeLength,
		name2 : 'scalePipeLength',
		scale3 : stat.userSetup.pipeCalculation2.scaleVolume,
		name3 : 'scaleVolume',
		calcType : 'pipeCalculation_volume',
		nomoName : 'pipeCalculation',
		verboseLevel : 0,
	})
	scale[3] = drawScale(stat.userSetup.pipeCalculation2.scaleVolume)


	cb = pipeCalculation({
		scaleDiameter : stat.userInput.pipeCalculation2.pipeDiameter ,
		scalePipeLength : stat.userInput.pipeCalculation2.pipeLength ,
		calcType : 'pipeCalculation_volume',
		nomoName : 'pipeCalculation',
		verboseLevel : 2
	})	

console.log(cb)
		

	console.log( 'Ruler1 ' +
		' diameter: ' + cb.pipeDiameter +
		' volume: ' + cb.pipeVolume +
		' length: ' + cb.pipeLength
		)


	var ruler = drawRuler([
		stat.userSetup.pipeCalculation2.scaleDiameter,
		stat.userSetup.pipeCalculation2.scaleVolume,
		stat.userSetup.pipeCalculation2.scalePipeLength,
		],
		[
		toUserUnits( cb.pipeDiameter , stat.userSetup.pipeCalculation2.scaleDiameter.unit ),
		toUserUnits( cb.pipeVolume ,stat.userSetup.pipeCalculation2.scaleVolume.unit ),
		toUserUnits( cb.pipeLength ,stat.userSetup.pipeCalculation2.scalePipeLength.unit ),
		]
		);




		
	var allLines = [
		...scale[1].scales,
		...scale[2].scales,
		...scale[3].scales,
		...ruler,
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



	
}
