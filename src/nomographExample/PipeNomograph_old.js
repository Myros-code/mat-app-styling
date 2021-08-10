//last change: 20210310_12:00

import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawLogScale , drawTableScale, tableLookup, logTesselation, linTesselation} from "./scales.js";
import { userSetup, userInput, userSettings } from "./settings.js";
import { pipeCalculation, points2parameter, value2pos,
				 minMax2parameter, toSiUnits, toUserUnits, pos2value,
				 points2intersection } from "./coreFunctions.js";
import { brine } from "./brine.js";





if (userSettings.renderWidth > 0 ){
	window.innerWidth = userSettings.renderWidth
	}
if (userSettings.renderHeight > 0){
	window.innerHeight = userSettings.renderHeight
}

function drawPolygon(){


//polygon consists of 8 points + left border equal Pressure line.
// min and max Pressure gets a little horizontal offset, to be better readable

//create array of points with x,y
	var nomoName = 'pipeCalculation'
	var scaleName = 'scalePressure'
	var minlabel=userSetup[nomoName][scaleName].min
	var maxlabel=userSetup[nomoName][scaleName].max
	var table=userSetup[nomoName][scaleName].table
	var steps=userSetup[nomoName][scaleName].deviders
	var pos_x, pos_y, j, points = []
	var offset, value, p, q, m, n
	var scaleValues, labelValues
	
	if ( userSetup[nomoName][scaleName].deviders.scaling === 'man' ){
		scaleValues = steps.scaleSteps;
		labelValues = steps.labelSteps;
		}
	if ( userSetup[nomoName][scaleName].deviders.scaling === 'log' ){
		scaleValues = logTesselation(minlabel, maxlabel, steps.scaleSteps);
		labelValues = logTesselation(minlabel, maxlabel, steps.labelSteps);		
		}
	if ( userSetup[nomoName][scaleName].deviders.scaling === 'lin' ){
		scaleValues = linTesselation(minlabel, maxlabel, steps.scaleSteps);
		labelValues = linTesselation(minlabel, maxlabel, steps.labelSteps);
		}

	pos_x = tableLookup( scaleValues[0] , table , 'x' )
	pos_y = tableLookup( scaleValues[0] , table , 'y' )

	j=0
	for (const v in scaleValues) {
			if(scaleValues[v] >= userSetup.pipeCalculation.safeArea.minPressure && scaleValues[v] <= userSetup.pipeCalculation.safeArea.maxPressure ){
				points[j] = tableLookup( scaleValues[v] , table , 'x' ) - pos_x
				j++
				points[j] = tableLookup( scaleValues[v] , table , 'y' ) - pos_y
				j++
			}
		}

	// a step to the right
	offset = window.innerWidth * 0.05
	points[j] = points[j-2] + offset
	j++
	points[j] = points[j-2]
	j++
	
	// next point is maxVelocity
	value = userSetup.pipeCalculation.safeArea.maxVelocity
	p = userSetup.pipeCalculation.scaleVelocity.p
	q = userSetup.pipeCalculation.scaleVelocity.q
	m = userSetup.pipeCalculation.scaleVelocity.m
	n = userSetup.pipeCalculation.scaleVelocity.n

	points[j] = m * value + n - pos_x
	j++
	points[j] = p * Math.log10(value) + q - pos_y 
	j++

	// next point is maxDiameter
	value = userSetup.pipeCalculation.safeArea.maxDiameter
	p = userSetup.pipeCalculation.scaleDiameter.p
	q = userSetup.pipeCalculation.scaleDiameter.q
	m = userSetup.pipeCalculation.scaleDiameter.m
	n = userSetup.pipeCalculation.scaleDiameter.n
	points[j] = m *  value + n - pos_x
	j++
	points[j] = p * Math.log10( value ) + q - pos_y
	j++


	// next point is minDiameter
	value = userSetup.pipeCalculation.safeArea.minDiameter
	p = userSetup.pipeCalculation.scaleDiameter.p
	q = userSetup.pipeCalculation.scaleDiameter.q
	m = userSetup.pipeCalculation.scaleDiameter.m
	n = userSetup.pipeCalculation.scaleDiameter.n
	points[j] = m *  value  + n - pos_x
	j++
	points[j] = p * Math.log10( value )  + q - pos_y
	j++

	// next point is minVelocity
	value = userSetup.pipeCalculation.safeArea.minVelocity
	p = userSetup.pipeCalculation.scaleVelocity.p
	q = userSetup.pipeCalculation.scaleVelocity.q
	m = userSetup.pipeCalculation.scaleVelocity.m
	n = userSetup.pipeCalculation.scaleVelocity.n
	points[j] = m *  value + n - pos_x
	j++
	points[j] = p * Math.log10( value ) + q - pos_y
	j++

	// next point is offset from startpoint
	offset = window.innerWidth * 0.05
	points[j] = points[0] + offset
	j++
	points[j] = points[1]
	j++
	
	// next point is startpoint
	points[j] = points[0]
	j++
	points[j] = points[1]
	j++


  var polygon = {
    x: pos_x,
    y: pos_y,
    points: points,
    stroke: "blue",
    strokeWidth: userSettings.strokeWidth * window.innerWidth * 1,
	opacity : 0.5,
	fill : "DeepSkyBlue",
	closed : true
  };
  return ( polygon ); // returns the values of connection line, where the line goes through!
}


function getDiameterParameter(){
	var cb

	cb = minMax2parameter(
		userSetup.pipeCalculation.scaleDiameter, 
		userSetup.pipeCalculation.scaleDiameter.min, 
		userSetup.pipeCalculation.scaleDiameter.max
		)

	userSetup.pipeCalculation.scaleDiameter.p = cb.p
	userSetup.pipeCalculation.scaleDiameter.q = cb.q
	userSetup.pipeCalculation.scaleDiameter.m = cb.m
	userSetup.pipeCalculation.scaleDiameter.n = cb.n
	}

function getVolumeFlowParameter(){
	var cb
	cb = minMax2parameter(
		userSetup.pipeCalculation.scaleVolumeFlow, 
		userSetup.pipeCalculation.scaleVolumeFlow.min, 
		userSetup.pipeCalculation.scaleVolumeFlow.max
		)

	userSetup.pipeCalculation.scaleVolumeFlow.p = cb.p
	userSetup.pipeCalculation.scaleVolumeFlow.q = cb.q
	userSetup.pipeCalculation.scaleVolumeFlow.m = cb.m
	userSetup.pipeCalculation.scaleVolumeFlow.n = cb.n
	}

function getPowerParameter(){
	// power scale is made as fork of volume Flow, so most parameters are copied.

	// calculate parameter for Power scale
	// cp in [ J/(kg·K) ]
	var cb

	var cp = brine(
		userInput.pipeCalculation.brineType, 
		'cp', 
		userInput.pipeCalculation.temperature, 
		userInput.pipeCalculation.brineRatio
		);		
	var rho = brine(
		userInput.pipeCalculation.brineType, 
		'rho', 
		userInput.pipeCalculation.temperature, 
		userInput.pipeCalculation.brineRatio
		);		


	userSetup.pipeCalculation.scalePower.type = userSetup.pipeCalculation.scaleVolumeFlow.type
	userSetup.pipeCalculation.scalePower.position = userSetup.pipeCalculation.scaleVolumeFlow.position
	userSetup.pipeCalculation.scalePower.positionX = userSetup.pipeCalculation.scaleVolumeFlow.positionX
	userSetup.pipeCalculation.scalePower.positionY = userSetup.pipeCalculation.scaleVolumeFlow.positionY
	userSetup.pipeCalculation.scalePower.height = userSetup.pipeCalculation.scaleVolumeFlow.height
	userSetup.pipeCalculation.scalePower.deviders.scaling = userSetup.pipeCalculation.scaleVolumeFlow.deviders.scaling
	userSetup.pipeCalculation.scalePower.reverse = userSetup.pipeCalculation.scaleVolumeFlow.reverse


	userSetup.pipeCalculation.scalePower.min = toUserUnits( 
		cp * toSiUnits(userSetup.pipeCalculation.scaleVolumeFlow.min, userSetup.units.volumeFlow) * rho * userInput.pipeCalculation.deltaTemp,
		userSetup.units.power)



	userSetup.pipeCalculation.scalePower.max = toUserUnits(
		cp * toSiUnits(userSetup.pipeCalculation.scaleVolumeFlow.max, userSetup.units.volumeFlow) * rho * userInput.pipeCalculation.deltaTemp,
		userSetup.units.power)
		
	cb = minMax2parameter(
		userSetup.pipeCalculation.scalePower, 
		userSetup.pipeCalculation.scalePower.min, 
		userSetup.pipeCalculation.scalePower.max
		)
	userSetup.pipeCalculation.scalePower.p = cb.p
	userSetup.pipeCalculation.scalePower.q = cb.q
	userSetup.pipeCalculation.scalePower.m = cb.m
	userSetup.pipeCalculation.scalePower.n = cb.n
}

function getPressureParameter(){
		// pick first couple at 50% of screen height.
		var parameterSet=[]
		var diameter, flowRate, flowResult, pressure, cb
		var i = 0

		// get parameterSet with values, wich will be translated  to xy coordinates of points

		for (var d = 0; d <= 1; d = d + 0.05 ){
			parameterSet[i]= {}
			diameter = pos2value(userSetup.pipeCalculation.scaleDiameter , (window.innerHeight * d) )
			flowRate = pos2value(userSetup.pipeCalculation.scaleVolumeFlow , (window.innerHeight * d) )

			//pressure = 
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				flowRate : toSiUnits(flowRate, userSetup.units.volumeFlow) })
			parameterSet[i].diameter_0 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_0 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_0 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_0 = toUserUnits( flowResult.pressure, userSetup.units.pressure)

			//console.log('calculating: ' + parameterSet[i].pressure_0)

			//change diameter * 1.5, search Flowrate
			diameter = diameter * 1.5
			pressure = parameterSet[i].pressure_0
			//console.log(diameter, pressure)
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				pressure : toSiUnits(pressure, userSetup.units.pressure) })
			//console.log(flowResult.pressure)
			parameterSet[i].diameter_1 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_1 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_1 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_1 = toUserUnits( flowResult.pressure, userSetup.units.pressure)


			diameter = diameter / ( 1.5 * 1.5 )
			pressure = parameterSet[i].pressure_0
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				pressure : toSiUnits(pressure, userSetup.units.pressure) })
			parameterSet[i].diameter_2 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_2 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_2 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_2 = toUserUnits( flowResult.pressure, userSetup.units.pressure)
			i++
		}


		for (i=0; i<parameterSet.length; i++){
		cb = points2intersection( 
			[{ x : userSetup.pipeCalculation.scaleDiameter.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleDiameter ,parameterSet[i].diameter_1) },
			{ x : userSetup.pipeCalculation.scaleVolumeFlow.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleVolumeFlow ,parameterSet[i].flowRate_1) },
			{ x : userSetup.pipeCalculation.scaleDiameter.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleDiameter, parameterSet[i].diameter_2) },
			{ x : userSetup.pipeCalculation.scaleVolumeFlow.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleVolumeFlow ,parameterSet[i].flowRate_2) }]
			)
			parameterSet[i].x = cb.x
			parameterSet[i].y = cb.y
		}

		var points=[]
		// log parameters.
		for (i=0; i<parameterSet.length; i++){
		points[i]={}
		points[i].y = parameterSet[i].y
		points[i].val = parameterSet[i].pressure_0
		}




		//if no math function is helping, using lookup table :-)  cpu intense, but failsafe
		var table={}
		for (i=0; i<parameterSet.length; i++){
			table[i]={
			x : parameterSet[i].x,
			y : parameterSet[i].y,
			val : parameterSet[i].pressure_0
			}
		}
		userSetup.pipeCalculation.scalePressure.table = table
		
		
		
		
		//getting m,n for x coordinate, depending on parameter
		for (i=0; i<parameterSet.length; i++){
		points[i]={}
		points[i].y = parameterSet[i].x
		points[i].val = parameterSet[i].pressure_0
		}
		cb = points2parameter('inverse', points)
		userSetup.pipeCalculation.scalePressure.m = cb.p
		userSetup.pipeCalculation.scalePressure.n = cb.q
}

function getVelocityParameter(){
		var parameterSet=[]

		// pick first couple at 50% of screen height.
		var diameter, flowRate, flowResult, velocity, cb
		var i = 0

		// get parameterSet with values, wich will be translated  to xy coordinates of points

		for (var d = 0.2; d <= 0.8; d = d + 0.1 ){
			parameterSet[i]= {}
			diameter = pos2value(userSetup.pipeCalculation.scaleDiameter , (window.innerHeight * d) )
			flowRate = pos2value(userSetup.pipeCalculation.scaleVolumeFlow , (window.innerHeight * d) )

			//pressure = 
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				flowRate : toSiUnits(flowRate, userSetup.units.volumeFlow) })
			parameterSet[i].diameter_0 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_0 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_0 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_0 = toUserUnits( flowResult.pressure, userSetup.units.pressure)

			//console.log('calculating: ' + parameterSet[i].pressure_0)

			//change diameter * 1.5, search velocity
			diameter = diameter * 1.5
			velocity = parameterSet[i].velocity_0
			
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				velocity : toSiUnits(velocity, userSetup.units.pressure) })
			
			parameterSet[i].diameter_1 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_1 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_1 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_1 = toUserUnits( flowResult.pressure, userSetup.units.pressure)


			diameter = diameter / ( 1.5 * 1.5 )
			velocity = parameterSet[i].velocity_0
			flowResult = pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(diameter, userSetup.units.pipeDiameter) ,
				velocity : toSiUnits(velocity, userSetup.units.pressure) })
			parameterSet[i].diameter_2 = toUserUnits( flowResult.diameter, userSetup.units.pipeDiameter)
			parameterSet[i].flowRate_2 = toUserUnits( flowResult.flowRate, userSetup.units.volumeFlow)
			parameterSet[i].velocity_2 = toUserUnits( flowResult.velocity, userSetup.units.speed)
			parameterSet[i].pressure_2 = toUserUnits( flowResult.pressure, userSetup.units.pressure)
			i++
		}


		for (i=0; i<parameterSet.length; i++){
		cb = points2intersection( 
			[{ x : userSetup.pipeCalculation.scaleDiameter.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleDiameter ,parameterSet[i].diameter_1) },
			{ x : userSetup.pipeCalculation.scaleVolumeFlow.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleVolumeFlow ,parameterSet[i].flowRate_1) },
			{ x : userSetup.pipeCalculation.scaleDiameter.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleDiameter, parameterSet[i].diameter_2) },
			{ x : userSetup.pipeCalculation.scaleVolumeFlow.positionX * window.innerWidth, y : value2pos(userSetup.pipeCalculation.scaleVolumeFlow ,parameterSet[i].flowRate_2) }]
			)
			parameterSet[i].x = cb.x
			parameterSet[i].y = cb.y
		}

		var points=[]
		// log parameters.
		for (i=0; i<parameterSet.length; i++){
		points[i]={}
		points[i].y = parameterSet[i].y
		points[i].val = parameterSet[i].velocity_0
		}

		//getting p,q for y coordinate depending on value
		cb = points2parameter('logarithmic', points)
		userSetup.pipeCalculation.scaleVelocity.p = cb.p
		userSetup.pipeCalculation.scaleVelocity.q = cb.q

		//getting m,n for x coordinate, depending on parameter
		for (i=0; i<parameterSet.length; i++){
		points[i]={}
		points[i].y = parameterSet[i].x
		points[i].val = parameterSet[i].velocity_0
		}
		cb = points2parameter('inverse', points)
		userSetup.pipeCalculation.scaleVelocity.m = cb.p
		userSetup.pipeCalculation.scaleVelocity.n = cb.q

}

function drawConnectionLine(values) {
  var ConnectionLine = [];

  //var i; 
  var points = []
  	
  	
	var	pos_x = tableLookup( values[0] , userSetup.pipeCalculation.scalePressure.table , 'x' )
	var	pos_y = tableLookup( values[0] , userSetup.pipeCalculation.scalePressure.table , 'y' )  	
  		
	points[0]= 0 
	points[1]= 0 

	points[2]=userSetup.pipeCalculation.scaleVelocity.m * (1/values[1]) + userSetup.pipeCalculation.scaleVelocity.n - pos_x
	points[3]=userSetup.pipeCalculation.scaleVelocity.p * Math.log10(values[1]) + userSetup.pipeCalculation.scaleVelocity.q - pos_y

	points[4]=userSetup.pipeCalculation.scaleVolumeFlow.positionX * window.innerWidth - pos_x
	points[5]=userSetup.pipeCalculation.scaleVolumeFlow.p * Math.log10(values[2]) + userSetup.pipeCalculation.scaleVolumeFlow.q - pos_y

	points[6]=userSetup.pipeCalculation.scaleDiameter.positionX * window.innerWidth - pos_x
	points[7]=userSetup.pipeCalculation.scaleDiameter.p * Math.log10(values[3]) + userSetup.pipeCalculation.scaleDiameter.q - pos_y

  ConnectionLine = {
    x: pos_x,
    y: pos_y,
    points: points,
    stroke: "red",
    strokeWidth: userSettings.strokeWidth * window.innerWidth * 0.5,
    tension: 0.5
  };
  return ( ConnectionLine ); // returns the values of connection line, where the line goes through!
}


getVolumeFlowParameter()
getDiameterParameter()
getPressureParameter()
getVelocityParameter()
getPowerParameter()


var scale1 = drawTableScale('scalePressure', 'pipeCalculation');
var scale2 = drawLogScale('scaleVelocity', 'pipeCalculation');
var scale3 = drawLogScale('scaleVolumeFlow', 'pipeCalculation');
var scale4 = drawLogScale('scaleDiameter', 'pipeCalculation');
var scale5 = drawLogScale('scalePower', 'pipeCalculation');

var ruler = []
var ruler_values = []


ruler_values[0]=pipeCalculation({
				temperature: userInput.pipeCalculation.temperature, 
				diameter : toSiUnits(userInput.pipeCalculation.pipeDiameter, userSetup.units.pipeDiameter) ,
				flowRate : toSiUnits(userInput.pipeCalculation.flowRate, userSetup.units.volumeFlow) })



ruler[0] = drawConnectionLine(
	[ toUserUnits(ruler_values[0].pressure , userSetup.units.pressure), 
		toUserUnits(ruler_values[0].velocity, userSetup.units.speed), 
		toUserUnits(ruler_values[0].flowRate, userSetup.units.volumeFlow), 
		toUserUnits(ruler_values[0].diameter, userSetup.units.pipeDiameter)]
	);

var polygon = []
polygon[0] = drawPolygon()

// following has to be added to allLines array:
//  ...ruler 

var allLines = [
  ...scale1.scales,
  ...scale2.scales,
  ...scale3.scales,
  ...scale4.scales,
  ...scale5.scales,
  ...ruler,
  ...polygon
];

var allLabels = [
  ...scale1.labels,
  ...scale2.labels,
  ...scale3.labels,
  ...scale4.labels,
  ...scale5.labels
];



//definition of the react part may be more elegant made by skilled react user!!
const PipeNomograph = function () {
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

export default PipeNomograph;
