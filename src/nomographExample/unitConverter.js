//last change: 20210209_00:15

import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawScale } from "./scales.js";
import { userSetup, userInput, userSettings} from "./settings.js";
import { minMax2parameter, toUserUnits, toSiUnits, value2pos } from "./coreFunctions.js";


if (userSettings.renderWidth > 0 ){
	window.innerWidth = userSettings.renderWidth
	}
if (userSettings.renderHeight > 0){
	window.innerHeight = userSettings.renderHeight
}

function drawConverterScales(input, setup, ruler){
	//make object, where is conatined, wich scales to draw
	var scaleList = input
	var i, object = []

	// delete not active entries

	for ( const scale in scaleList ){
		if ( scaleList[scale] === false ){ delete scaleList[scale] }
		}



	var min, max


	if ( typeof(setup.siMin) === 'number' && typeof(setup.siMax) === 'number' ){
		min = setup.siMin
		max = setup.siMax
		} 
		
		else {
		// get for all scales min and max in Si units
		for ( const scale in scaleList ){
			setup[scale].siMin = toSiUnits( setup[scale].min , setup[scale].unit)
			setup[scale].siMax = toSiUnits( setup[scale].max , setup[scale].unit)
			}
			
		// search min and max in Si units
		for ( const scale in scaleList ){
			if ( typeof(min) != 'number' ){ min = setup[scale].siMin }
			if ( typeof(max) != 'number' ){ max = setup[scale].siMax }


			if ( min > setup[scale].siMin ){ min = setup[scale].siMin }		
			if ( max < setup[scale].siMax ){ max = setup[scale].siMax }
			}
		}

	var dist = ( 1 - 2 * setup.paddingX ) / ( Object.keys(scaleList).length - 1 )
	i=0	
	
	var allLines = [];
	var allLabels = []
	
	for ( const scale in scaleList ){
		setup[scale].siMin = min
		setup[scale].siMax = max
		
		setup[scale].min = toUserUnits(setup[scale].siMin , setup[scale].unit )
		setup[scale].max = toUserUnits(setup[scale].siMax , setup[scale].unit )
		// calculate x position of scales ( evenly spaced including padding)
		setup[scale].positionX = 
		setup.paddingX + i * dist

	
		// setting reverse, positionY and height, ...
		setup[scale].type = setup.type	
		setup[scale].reverse = setup.reverse
		setup[scale].positionY = setup.paddingY
		setup[scale].height = 1 - ( 2 * setup.paddingY )
		setup[scale].head = setup[scale].unit
		setup[scale].offsetX = setup.offsetX
		
		// calculate parameter m,n,p,q for scales
		var cb = minMax2parameter(
			setup[scale], 
			setup[scale].min, 
			setup[scale].max
			)

		setup[scale].p = cb.p
		setup[scale].q = cb.q
		setup[scale].m = cb.m
		setup[scale].n = cb.n

		setup[scale].position = 'auto'
		// draw scale:
		
		object[i] = drawScale( setup[scale] )
		// split object in labels and lines
		i++
		}
		
	
	for ( const i in object ){
		allLines = allLines.concat(object[i].scales);
		allLabels = allLabels.concat(object[i].labels);
		}
	
	
	// insert horizontal ruler
	var points = []

	i=0	
	for ( const scale in scaleList ){
		if ( i === 0 ){
			//translate ruler from SI to userUnits of the actual scale!!
			ruler = toUserUnits(ruler, setup[scale].unit)
			
			var rP = value2pos(setup[scale], ruler)
			var pos_x = setup[scale].n
			var pos_y = rP
			}
		points[i] = setup[scale].n - pos_x
		i++
		points[i] = 0 
		i++
		}

	var ConnectionLine = {
		x: pos_x,
		y: pos_y,
		points: points,
		stroke: "red",
		strokeWidth: userSettings.strokeWidth * window.innerWidth * 0.5,
		tension: 0.5
		};

	allLines = allLines.concat(ConnectionLine);

	return { lines : allLines, labels : allLabels }
	}


export const WeightConverter = function () {
	var cb = drawConverterScales(
		userInput.unitConverter.weight, 
		userSetup.unitConverter.weight,
		userInput.unitConverter.rulerPositions.weight)

	var allLines = cb.lines  //.... should be an array of objects, with all objects.
	var allLabels = cb.labels




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
              offsetX={label.offsetX}
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

export const FlowRateConverter = function(){
	var cb = drawConverterScales(
		userInput.unitConverter.flowRate, 
		userSetup.unitConverter.flowRate,
		userInput.unitConverter.rulerPositions.flowRate)

	var allLines = cb.lines  //.... should be an array of objects, with all objects.
	var allLabels = cb.labels

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

export const PressureConverter = function(){
	var cb = drawConverterScales(
		userInput.unitConverter.pressure, 
		userSetup.unitConverter.pressure,
		userInput.unitConverter.rulerPositions.pressure)

	var allLines = cb.lines  //.... should be an array of objects, with all objects.
	var allLabels = cb.labels

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

export const LengthConverter = function(){
	var cb = drawConverterScales(
		userInput.unitConverter.length, 
		userSetup.unitConverter.length,
		userInput.unitConverter.rulerPositions.length)

	var allLines = cb.lines  //.... should be an array of objects, with all objects.
	var allLabels = cb.labels

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
              offsetX={label.offsetX}
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

