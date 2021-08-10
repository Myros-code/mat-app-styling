//last change: 20210403_13:00



import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawScale , tableLookup, getAutoScaleParameter, getTwinScaleParameter} from "./scales.js";
import { stat } from "./settings.js";
import { brine } from "./brine.js";
import { floorHeatingCalculation, expansionVesselCalculation, value2pos,minMax2parameter,
	pos2value, toUserUnits, toSiUnits, points2intersection, drawRuler , moveScale} from "./coreFunctions.js";

//definition of the react part may be more elegant made by skilled react user!!

export const FloorHeating1 = function() {
		/*
		* scales on nomograph:
		* floorHeating1.scaleMeanTemp (manual)
		* floorHeating1.scaleFloorCoverResistance (manual)
		* floorHeating1.scalePower (auto)
		*/

	var i, cb, scaleName

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.floorHeating1.scaleMeanTemp,
		stat.userSetup.floorHeating1.scaleMeanTemp.min, 
		stat.userSetup.floorHeating1.scaleMeanTemp.max
		)

	stat.userSetup.floorHeating1.scaleMeanTemp.m = 0
	stat.userSetup.floorHeating1.scaleMeanTemp.n = stat.userSetup.floorHeating1.scaleMeanTemp.positionX * window.innerWidth
	stat.userSetup.floorHeating1.scaleMeanTemp.p = cb.p
	stat.userSetup.floorHeating1.scaleMeanTemp.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.floorHeating1.scaleFloorCoverResistance, 
		stat.userSetup.floorHeating1.scaleFloorCoverResistance.min, 
		stat.userSetup.floorHeating1.scaleFloorCoverResistance.max
		)
		
	stat.userSetup.floorHeating1.scaleFloorCoverResistance.m = 0
	stat.userSetup.floorHeating1.scaleFloorCoverResistance.n = stat.userSetup.floorHeating1.scaleFloorCoverResistance.positionX * window.innerWidth
	stat.userSetup.floorHeating1.scaleFloorCoverResistance.p = cb.p
	stat.userSetup.floorHeating1.scaleFloorCoverResistance.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.floorHeating1.scaleMeanTemp);
	scale[2] = drawScale(stat.userSetup.floorHeating1.scaleFloorCoverResistance);

		/*
		* scales on nomograph:
		* floorHeating1.scaleMeanTemp (manual)
		* floorHeating1.scaleFloorCoverResistance (manual)
		* floorHeating1.scalePower (auto)
		*/


	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating1.scaleMeanTemp,
		name1 : 'scaleMeanTemp',
		scale2 : stat.userSetup.floorHeating1.scaleFloorCoverResistance,
		name2 : 'scaleFloorCoverResistance',
		scale3 : stat.userSetup.floorHeating1.scalePower,
		name3 : 'scalePower',
		calcType : 'floorHeating1_Power',
		nomoName : 'floorHeating',
		verboseLevel : 0,
		
	})
		
		
		
	scale[3] = drawScale(stat.userSetup.floorHeating1.scalePower) ;


	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating1.scaleMeanTemp,
		name1 : 'scaleMeanTemp',
		scale2 : stat.userSetup.floorHeating1.scaleFloorCoverResistance,
		name2 : 'scaleFloorCoverResistance',
		scale3 : stat.userSetup.floorHeating1.scaleFloorTemp,
		name3 : 'scaleFloorTemp',
		calcType : 'floorHeating1_floorTemp',
		nomoName : 'floorHeating',
		verboseLevel : 0,
		
	})

	scale[4] = drawScale(stat.userSetup.floorHeating1.scaleFloorTemp) ;

   
    
	//ruler, calculate values and insert in userInput

	cb = floorHeatingCalculation({
		scaleMeanTemp : stat.userInput.floorHeating1.mwt ,
		scaleFloorCoverResistance : stat.userInput.floorHeating1.R_lambdaB ,
		calcType : 'floorHeating1_Power',
		nomoName : 'floorHeating',
		verboseLevel : 0
	})	

console.log(cb)
		

	console.log( 'Ruler1 ' +
		' MWT: ' + cb.mwt +
		' Power per m²: ' + cb.q +
		' Resistance of Floor: ' + cb.R_lambdaB,
		' floor temperature: ' + cb.floorTemp
		)


	var ruler = drawRuler([
		stat.userSetup.floorHeating1.scaleMeanTemp,
		stat.userSetup.floorHeating1.scalePower,
		stat.userSetup.floorHeating1.scaleFloorCoverResistance],
		[
		toUserUnits( cb.mwt , stat.userSetup.floorHeating1.scaleMeanTemp.unit ),
		toUserUnits( cb.q , stat.userSetup.floorHeating1.scalePower.unit ),
		toUserUnits( cb.R_lambdaB , stat.userSetup.floorHeating1.scaleFloorCoverResistance.unit ),
		]
		);

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...scale[4].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	  ...scale[4].labels,
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


export const FloorHeating2 = function() {
		/*
		* scales on nomograph:
		* parent: floorHeating2.
		* floorHeating2.scalePipeDistance (manual)
		* floorHeating2.scaleFloorArea (manual)
		* pipe length
		* pipe volume
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
		stat.userSetup.floorHeating2.scalePipeDistance,
		stat.userSetup.floorHeating2.scalePipeDistance.min, 
		stat.userSetup.floorHeating2.scalePipeDistance.max
		)

	stat.userSetup.floorHeating2.scalePipeDistance.m = 0
	stat.userSetup.floorHeating2.scalePipeDistance.n = stat.userSetup.floorHeating2.scalePipeDistance.positionX * window.innerWidth
	stat.userSetup.floorHeating2.scalePipeDistance.p = cb.p
	stat.userSetup.floorHeating2.scalePipeDistance.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.floorHeating2.scaleFloorArea, 
		stat.userSetup.floorHeating2.scaleFloorArea.min, 
		stat.userSetup.floorHeating2.scaleFloorArea.max
		)
		
	stat.userSetup.floorHeating2.scaleFloorArea.m = 0
	stat.userSetup.floorHeating2.scaleFloorArea.n = stat.userSetup.floorHeating2.scaleFloorArea.positionX * window.innerWidth
	stat.userSetup.floorHeating2.scaleFloorArea.p = cb.p
	stat.userSetup.floorHeating2.scaleFloorArea.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.floorHeating2.scalePipeDistance);
	scale[2] = drawScale(stat.userSetup.floorHeating2.scaleFloorArea);

		/*
		* scales on nomograph:
		* parent: floorHeating2.
		* floorHeating2.scalePipeDistance (manual)
		* floorHeating2.scaleFloorArea (manual)
		* pipe length
		* pipe volume
		*/
	
	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating2.scalePipeDistance,
		name1 : 'scalePipeDistance',
		scale2 : stat.userSetup.floorHeating2.scaleFloorArea,
		name2 : 'scaleFloorArea',
		scale3 : stat.userSetup.floorHeating2.scalePipeLength,
		name3 : 'scalePipeLength',
		calcType : 'floorHeating1_pipeLength',
		nomoName : 'floorHeating',
		verboseLevel : 0,
		
	})
	scale[3] = drawScale(stat.userSetup.floorHeating2.scalePipeLength) ;

getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating2.scalePipeDistance,
		name1 : 'scalePipeDistance',
		scale2 : stat.userSetup.floorHeating2.scaleFloorArea,
		name2 : 'scaleFloorArea',
		scale3 : stat.userSetup.floorHeating2.scalePipeVolume,
		name3 : 'scalePipeVolume',
		calcType : 'floorHeating1_pipeVolume',
		nomoName : 'floorHeating',
		verboseLevel : 0,
		
	})
		
		
	scale[4] = drawScale(stat.userSetup.floorHeating2.scalePipeVolume) ;
   
    
	//ruler, calculate values and insert in userInput

	cb = floorHeatingCalculation({
		scalePipeDistance : stat.userInput.floorHeating2.pipeDistance ,
		scaleFloorArea : stat.userInput.floorHeating2.floorArea ,
		calcType : 'floorHeating1_pipeLength',
		nomoName : 'floorHeating',
		verboseLevel : 0
	})	

console.log(cb)
		

	console.log( 'Ruler2 ' +
		' Pipe Disrance: ' + cb.pipeDistance +
		' Pipe Length: ' + cb.pipeLength +
		' Pipe Volume: ' + cb.pipeVolume +
		' Floor Area: ' + cb.floorArea
		)


	var ruler = drawRuler([
		stat.userSetup.floorHeating2.scalePipeDistance,
		stat.userSetup.floorHeating2.scalePipeLength,
		stat.userSetup.floorHeating2.scaleFloorArea],
		[
		toUserUnits( cb.pipeDistance , stat.userSetup.floorHeating2.scalePipeDistance.unit ),
		toUserUnits( cb.pipeLength ,stat.userSetup.floorHeating2.scalePipeLength.unit ),
		toUserUnits( cb.floorArea ,stat.userSetup.floorHeating2.scaleFloorArea.unit ),
		]
		);

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...scale[4].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	  ...scale[4].labels,
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


export const FloorHeating3 = function() {
	var i, cb, scaleName
	var scale = {}
		
	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.floorHeating3.scalePipeLength,
		stat.userSetup.floorHeating3.scalePipeLength.min, 
		stat.userSetup.floorHeating3.scalePipeLength.max
		)

	stat.userSetup.floorHeating3.scalePipeLength.m = 0
	stat.userSetup.floorHeating3.scalePipeLength.n = stat.userSetup.floorHeating3.scalePipeLength.positionX * window.innerWidth
	stat.userSetup.floorHeating3.scalePipeLength.p = cb.p
	stat.userSetup.floorHeating3.scalePipeLength.q = cb.q
	

	scale[1] = drawScale(stat.userSetup.floorHeating3.scalePipeLength);

	cb = minMax2parameter(
		stat.userSetup.floorHeating3.scaleFlowRate,
		stat.userSetup.floorHeating3.scaleFlowRate.min, 
		stat.userSetup.floorHeating3.scaleFlowRate.max
		)

	stat.userSetup.floorHeating3.scaleFlowRate.m = 0
	stat.userSetup.floorHeating3.scaleFlowRate.n = stat.userSetup.floorHeating3.scaleFlowRate.positionX * window.innerWidth
	stat.userSetup.floorHeating3.scaleFlowRate.p = cb.p
	stat.userSetup.floorHeating3.scaleFlowRate.q = cb.q
	

	scale[1] = drawScale(stat.userSetup.floorHeating3.scalePipeLength);
	scale[2] = drawScale(stat.userSetup.floorHeating3.scaleFlowRate);


// twin scale - flowrate, power

	var cp = brine(
		stat.userInput.floorHeating3.brineType, 
		'cp', 
		stat.userInput.floorHeating3.temperature, 
		stat.userInput.floorHeating3.brineRatio
		);		
	var rho = brine(
		stat.userInput.floorHeating3.brineType, 
		'rho', 
		stat.userInput.floorHeating3.temperature, 
		stat.userInput.floorHeating3.brineRatio
		);		


	cb = getTwinScaleParameter({
		scale1 : stat.userSetup.floorHeating3.scaleFlowRate,
		name1 : 'scaleFlowRate',
		scale2 : stat.userSetup.floorHeating3.scalePower,
		name2 : 'scalePower',
		nomoName : 'floorHeating3',
		factor : cp * rho * stat.userInput.floorHeating3.deltaTemp 
				* toSiUnits(1 , stat.userSetup.floorHeating3.scaleFlowRate.unit) 
				/ toSiUnits(1 , stat.userSetup.floorHeating3.scalePower.unit),
		verboseLevel : 0,
	})

	stat.userSetup.floorHeating3.scalePower = JSON.parse( JSON.stringify(cb,null,2) )
	
	scale[3] = drawScale(stat.userSetup.floorHeating3.scalePower) ;


// pressure drop


	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating3.scalePipeLength,
		name1 : 'scalePipeLength',
		scale2 : stat.userSetup.floorHeating3.scaleFlowRate,
		name2 : 'scaleFlowRate',
		scale3 : stat.userSetup.floorHeating3.scalePressureDrop,
		name3 : 'scalePressureDrop',
		calcType : 'floorHeating_pressureDrop',
		nomoName : 'floorHeating',
		verboseLevel : 1,
	})
	scale[4] = drawScale(stat.userSetup.floorHeating3.scalePressureDrop) ;


// here comes the ruler !!


	cb = floorHeatingCalculation({
		scalePipeLength : stat.userInput.floorHeating3.pipeLength ,
		scaleFlowRate : stat.userInput.floorHeating3.flowRate ,
		deltaTemp : stat.userInput.floorHeating3.deltaTemp,
		calcType : 'floorHeating_pressureDrop',
		nomoName : 'floorHeating',
		verboseLevel : 0
	})	

console.log(cb)

	console.log( 'Ruler1 ' +
		' length: ' + cb.length +
		' dP: ' + cb.pressureDrop +
		' flowRate: ' + cb.flowRate + 
		' power: ' + cb.power
		)
		


	var ruler = drawRuler([
		stat.userSetup.floorHeating3.scalePipeLength,
		stat.userSetup.floorHeating3.scalePressureDrop,
		stat.userSetup.floorHeating3.scaleFlowRate,
		],
		[
		toUserUnits( cb.length , stat.userSetup.floorHeating3.scalePipeLength.unit ),
		toUserUnits( cb.pressureDrop ,stat.userSetup.floorHeating3.scalePressureDrop.unit ),
		toUserUnits( cb.flowRate ,stat.userSetup.floorHeating3.scaleFlowRate.unit ),
		]
		);


// just a straight ruler, from 2 points
	var ruler2 = drawRuler([
		stat.userSetup.floorHeating3.scalePipeLength,
		stat.userSetup.floorHeating3.scaleFlowRate,
		],
		[
		toUserUnits( cb.length , stat.userSetup.floorHeating3.scalePipeLength.unit ),
		toUserUnits( cb.flowRate ,stat.userSetup.floorHeating3.scaleFlowRate.unit ),
		]
		);
	

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...scale[4].scales,
	  ...ruler,
//	  ...ruler2,	  
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	  ...scale[4].labels,
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




export const FloorHeating4 = function() {
		/*
		* scales on nomograph:
		* floorHeating1.scaleMeanTemp (manual)
		* floorHeating1.scalePipeDistance (manual)
		* floorHeating1.scalePower (auto)
		*/

	var i, cb, scaleName

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.floorHeating4.scaleMeanTemp,
		stat.userSetup.floorHeating4.scaleMeanTemp.min, 
		stat.userSetup.floorHeating4.scaleMeanTemp.max
		)


	stat.userSetup.floorHeating4.scaleMeanTemp.m = cb.m
	stat.userSetup.floorHeating4.scaleMeanTemp.n = cb.n
	stat.userSetup.floorHeating4.scaleMeanTemp.p = cb.p
	stat.userSetup.floorHeating4.scaleMeanTemp.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.floorHeating4.scalePipeDistance, 
		stat.userSetup.floorHeating4.scalePipeDistance.min, 
		stat.userSetup.floorHeating4.scalePipeDistance.max
		)
		
	stat.userSetup.floorHeating4.scalePipeDistance.m = cb.m
	stat.userSetup.floorHeating4.scalePipeDistance.n = cb.n
	stat.userSetup.floorHeating4.scalePipeDistance.p = cb.p
	stat.userSetup.floorHeating4.scalePipeDistance.q = cb.q

console.log(JSON.stringify(cb,null,2))

	var scale = {}

	scale[1] = drawScale(stat.userSetup.floorHeating4.scaleMeanTemp);
	scale[2] = drawScale(stat.userSetup.floorHeating4.scalePipeDistance);

		/*
		* scales on nomograph:
		* floorHeating1.scaleMeanTemp (manual)
		* floorHeating1.scalePipeDistance (manual)
		* floorHeating1.scalePower (auto)
		*/
	
	
	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating4.scaleMeanTemp,
		name1 : 'scaleMeanTemp',
		scale2 : stat.userSetup.floorHeating4.scalePipeDistance,
		name2 : 'scalePipeDistance',
		scale3 : stat.userSetup.floorHeating4.scalePower,
		name3 : 'scalePower',
		calcType : 'floorHeating4_Power',
		nomoName : 'floorHeating',
		verboseLevel : 1,		
	})
		
		
	
	scale[3] = drawScale(stat.userSetup.floorHeating4.scalePower) ;
 
 	getAutoScaleParameter({
		scale1 : stat.userSetup.floorHeating4.scaleMeanTemp,
		name1 : 'scaleMeanTemp',
		scale2 : stat.userSetup.floorHeating4.scalePipeDistance,
		name2 : 'scalePipeDistance',
		scale3 : stat.userSetup.floorHeating4.scaleFloorTemp,
		name3 : 'scaleFloorTemp',
		calcType : 'floorHeating4_floorTemp',
		nomoName : 'floorHeating',
		verboseLevel : 1,
		
	})
	
	scale[4] = drawScale(stat.userSetup.floorHeating4.scaleFloorTemp) ;
 
 
 
	cb = floorHeatingCalculation({
		scaleMeanTemp : stat.userInput.floorHeating4.mwt ,
		scalePipeDistance : stat.userInput.floorHeating4.pipeDistance ,
		calcType : 'floorHeating4_Power',
		nomoName : 'floorHeating',
		verboseLevel : 1
	})	

console.log(cb)

		

	console.log( 'Ruler1 ' +
		' MWT:' + cb.mwt +
		' Power per m²:' + cb.q +
		' Floor Temperature °C:' + cb.floorTemp +
		' Pipe distance:' + cb.T,
		)


	var ruler = drawRuler([
		stat.userSetup.floorHeating4.scaleMeanTemp,
		//stat.userSetup.floorHeating4.scalePower,
		stat.userSetup.floorHeating4.scalePipeDistance],
		[
		toUserUnits( cb.mwt , stat.userSetup.floorHeating4.scaleMeanTemp.unit ),
		//toUserUnits( cb.q , stat.userSetup.floorHeating4.scalePower.unit ),
		toUserUnits( cb.T , stat.userSetup.floorHeating4.scalePipeDistance.unit ),
		]
		);


	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
		...scale[3].scales,
		...scale[4].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	  ...scale[4].labels,
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
