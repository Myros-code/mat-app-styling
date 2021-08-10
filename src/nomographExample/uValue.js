//last change: 20210416_01:00

import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawScale , getAutoScaleParameter, getAutoScale1Parameter} from "./scales.js";

import { stat } from "./settings.js";

import { points2parameter, value2pos, uValueCalculation,
				 minMax2parameter, toSiUnits, toUserUnits, pos2value,
				 points2intersection , drawRuler} from "./coreFunctions.js";





	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}


export const UValue1 = function(){
	// nomograph , which shows : length / diameter / volume of pipe
	var i, cb, scaleName
	var scale = {}
	cb = minMax2parameter(
		stat.userSetup.uValue1.scaleRelativePerimeter,
		stat.userSetup.uValue1.scaleRelativePerimeter.min, 
		stat.userSetup.uValue1.scaleRelativePerimeter.max
		)

	stat.userSetup.uValue1.scaleRelativePerimeter.m = 0
	stat.userSetup.uValue1.scaleRelativePerimeter.n = cb.n
	stat.userSetup.uValue1.scaleRelativePerimeter.p = cb.p
	stat.userSetup.uValue1.scaleRelativePerimeter.q = cb.q	

	cb = minMax2parameter(
		stat.userSetup.uValue1.scaleWallThicknes,
		stat.userSetup.uValue1.scaleWallThicknes.min, 
		stat.userSetup.uValue1.scaleWallThicknes.max
		)

	stat.userSetup.uValue1.scaleWallThicknes.m = 0
	stat.userSetup.uValue1.scaleWallThicknes.n = cb.n
	stat.userSetup.uValue1.scaleWallThicknes.p = cb.p
	stat.userSetup.uValue1.scaleWallThicknes.q = cb.q	

	scale[1] = drawScale(stat.userSetup.uValue1.scaleRelativePerimeter);
	scale[2] = drawScale(stat.userSetup.uValue1.scaleWallThicknes);
console.log(stat.userSetup.uValue1.scaleRelativePerimeter)


	getAutoScaleParameter({
		scale1 : stat.userSetup.uValue1.scaleRelativePerimeter,
		name1 : 'scaleRelativePerimeter',
		scale2 : stat.userSetup.uValue1.scaleWallThicknes,
		name2 : 'scaleWallThicknes',
		scale3 : stat.userSetup.uValue1.scaleUValue,
		name3 : 'scaleUValue',
		calcType : 'uCalculation_floorValue',
		nomoName : 'uValue',
		verboseLevel : 0,
	})
 

	scale[3] = drawScale(stat.userSetup.uValue1.scaleUValue)

console.log(scale[3])


	getAutoScale1Parameter({
		scale1 : stat.userSetup.uValue1.scaleRelativePerimeter,
		name1 : 'scaleRelativePerimeter',
		scale2 : stat.userSetup.uValue1.scaleWallThicknes,
		name2 : 'scaleWallThicknes',
		scale3 : stat.userSetup.uValue1.scaleU00Value,
		name3 : 'scaleU00Value',
		scale2_focus : 0,
		calcType : 'u00Calculation_floorValue',
		nomoName : 'uValue',
		verboseLevel : 0,
	})

	scale[4] = drawScale(stat.userSetup.uValue1.scaleU00Value)


	cb = uValueCalculation({
		scaleRelativePerimeter : stat.userInput.uValue1.relativePerimeter,			// value recalculated to SI-units for physical calculation
		scaleWallThicknes : stat.userInput.uValue1.wallThickness,
		calcType : 'u00Calculation_floorValue',
		nomoName : 'uValue',
		verboseLevel : 0
	})


	console.log(cb);
		

	console.log( 'Ruler1 ' +
		' perimeter: ' + cb.relativePerimeter +
		' u00: ' + cb.u00 +
		' u: ' + cb.u + 
		' thickness: ' + cb.wallThickness
		)


	var ruler = drawRuler([
		stat.userSetup.uValue1.scaleRelativePerimeter,
//		stat.userSetup.pipeCalculation2.scaleVolume,
		stat.userSetup.uValue1.scaleWallThicknes,
		],
		[
		toUserUnits( cb.relativePerimeter , stat.userSetup.uValue1.scaleRelativePerimeter.unit ),
//		toUserUnits( cb.pipeVolume ,stat.userSetup.pipeCalculation2.scaleVolume.unit ),
		toUserUnits( cb.wallThickness ,stat.userSetup.uValue1.scaleWallThicknes.unit ),
		]
		);

		
	var allLines = [
		...scale[1].scales,
		...scale[2].scales,
		...scale[3].scales,
		...scale[4].scales,
		...ruler,
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
