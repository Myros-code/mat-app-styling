//last change: 20210209_00:15
import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawLinScale, drawTableScale } from "./scales.js";
import { userSetup, userInput, userSettings} from "./settings.js";
import { radiatorCalculation, value2pos,minMax2parameter,
	pos2value, toUserUnits, points2intersection, points2parameter } from "./coreFunctions.js";



if (userSettings.renderWidth > 0 ){
	window.innerWidth = userSettings.renderWidth
	}
if (userSettings.renderHeight > 0){
	window.innerHeight = userSettings.renderHeight
}


// calculate parameter for Inflow and Outflow

var cb

cb = minMax2parameter(
	userSetup.radiatorCalculation.scaleInflow, 
	userSetup.radiatorCalculation.scaleInflow.min, 
	userSetup.radiatorCalculation.scaleInflow.max
	)
userSetup.radiatorCalculation.scaleInflow.m = 0
userSetup.radiatorCalculation.scaleInflow.n = userSetup.radiatorCalculation.scaleInflow.positionX * window.innerWidth
userSetup.radiatorCalculation.scaleInflow.p = cb.p
userSetup.radiatorCalculation.scaleInflow.q = cb.q


cb = minMax2parameter(
	userSetup.radiatorCalculation.scaleOutflow, 
	userSetup.radiatorCalculation.scaleOutflow.min, 
	userSetup.radiatorCalculation.scaleOutflow.max
	)
userSetup.radiatorCalculation.scaleOutflow.m = 0
userSetup.radiatorCalculation.scaleOutflow.n = userSetup.radiatorCalculation.scaleOutflow.positionX * window.innerWidth
userSetup.radiatorCalculation.scaleOutflow.p = cb.p
userSetup.radiatorCalculation.scaleOutflow.q = cb.q


function getOversizeParameter(){
		var parameterSet=[]

		// pick first couple at 50% of screen height.
		var inflowTemp, outflowTemp, radiator, roomTemp, radiatorResult, oversizeFactor
		var i = 0

		// get parameterSet with values, wich will be translated  to xy coordinates of points

		for (var d = 0.1; d <= 0.9; d = d + 0.1 ){
			
			inflowTemp = pos2value(userSetup.radiatorCalculation.scaleInflow , (window.innerHeight * d) )
			
			outflowTemp = inflowTemp * 0.9
			roomTemp = userInput.radiatorCalculation.roomTemp
			if ( outflowTemp > roomTemp ){
				parameterSet[i]= {}
				radiator = userSetup.radiators.radiator1

				radiatorResult = radiatorCalculation({ inflowTemp : inflowTemp, outflowTemp : outflowTemp, roomTemp : roomTemp, radiator : radiator })
		
				parameterSet[i].inflowTemp_0 = toUserUnits( radiatorResult.inflow, userSetup.units.temperature)
				parameterSet[i].outflowTemp_0 = toUserUnits( radiatorResult.outflow, userSetup.units.temperature)
				parameterSet[i].deltaMeanTemp_0 = toUserUnits( radiatorResult.deltaMean, userSetup.units.temperature)
				parameterSet[i].oversizeFactor_0 = radiatorResult.oversizeFactor

			
				inflowTemp = inflowTemp * 1.1
				oversizeFactor = parameterSet[i].oversizeFactor_0  //---> search inflow with same oversizeFactor
				radiatorResult = radiatorCalculation({ oversizeFactor: oversizeFactor, inflowTemp : inflowTemp, roomTemp : roomTemp, radiator : radiator })
				parameterSet[i].inflowTemp_1 = toUserUnits( radiatorResult.inflow, userSetup.units.temperature)
				parameterSet[i].outflowTemp_1 = toUserUnits( radiatorResult.outflow, userSetup.units.temperature)
				parameterSet[i].deltaMeanTemp_1 = toUserUnits( radiatorResult.deltaMean, userSetup.units.temperature)
				parameterSet[i].oversizeFactor_1 = radiatorResult.oversizeFactor
				
			}
			i++
		}

		for (i=0; i<parameterSet.length; i++){
			cb = points2intersection(
			[{ x : userSetup.radiatorCalculation.scaleInflow.positionX * window.innerWidth, y : value2pos(userSetup.radiatorCalculation.scaleInflow ,parameterSet[i].inflowTemp_0) },
			{ x : userSetup.radiatorCalculation.scaleOutflow.positionX * window.innerWidth, y : value2pos(userSetup.radiatorCalculation.scaleOutflow ,parameterSet[i].outflowTemp_0) },
			{ x : userSetup.radiatorCalculation.scaleInflow.positionX * window.innerWidth, y : value2pos(userSetup.radiatorCalculation.scaleInflow, parameterSet[i].inflowTemp_1) },
			{ x : userSetup.radiatorCalculation.scaleOutflow.positionX * window.innerWidth, y : value2pos(userSetup.radiatorCalculation.scaleOutflow ,parameterSet[i].outflowTemp_1) }]
			)
			parameterSet[i].x = cb.x
			parameterSet[i].y = cb.y
		}

		var table={}
		for (i=0; i<parameterSet.length; i++){
			table[i]={
			x : parameterSet[i].x,
			y : parameterSet[i].y,
			val : parameterSet[i].oversizeFactor_0
			}
		}

		//if no math function is helping, using lookup table :-)  cpu intense, but failsafe
		userSetup.radiatorCalculation.scaleOversizeFactor.table = table
		
		//parameters for position in 
		
		userSetup.radiatorCalculation.scaleOversizeFactor.m = 0
		userSetup.radiatorCalculation.scaleOversizeFactor.n = parameterSet[0].x


		// meanTemp does not need own function, as it is on same position like Oversize-Factor
		var points=[]
		for (i=0; i<parameterSet.length; i++){
		points[i]={}
		points[i].y = parameterSet[i].y
		points[i].val = parameterSet[i].deltaMeanTemp_0
		}

		//getting p,q for y coordinate depending on value
		cb = points2parameter('linear', points)

		userSetup.radiatorCalculation.scaleMeanTemp.p = cb.p
		userSetup.radiatorCalculation.scaleMeanTemp.q = cb.q

		//getting m,n for x coordinate, depending on parameter not needed. sacale is vertical

		userSetup.radiatorCalculation.scaleMeanTemp.m = 0
		userSetup.radiatorCalculation.scaleMeanTemp.n = parameterSet[0].x
}

getOversizeParameter()


function drawConnectionLine(values) {
	var ConnectionLine = [];

	//var i; 
	var points = []
  	
	var pos_x = userSetup.radiatorCalculation.scaleInflow.m * (values[0]) + userSetup.radiatorCalculation.scaleInflow.n
	var pos_y = userSetup.radiatorCalculation.scaleInflow.p * (values[0]) + userSetup.radiatorCalculation.scaleInflow.q
	
	points[0]=userSetup.radiatorCalculation.scaleInflow.m * (values[0]) + userSetup.radiatorCalculation.scaleInflow.n - pos_x
	points[1]=userSetup.radiatorCalculation.scaleInflow.p * (values[0]) + userSetup.radiatorCalculation.scaleInflow.q - pos_y

	points[2]=userSetup.radiatorCalculation.scaleMeanTemp.m * (values[1]) + userSetup.radiatorCalculation.scaleMeanTemp.n - pos_x
	points[3]=userSetup.radiatorCalculation.scaleMeanTemp.p * (values[1]) + userSetup.radiatorCalculation.scaleMeanTemp.q - pos_y

	points[4]=userSetup.radiatorCalculation.scaleOutflow.m * (values[2]) + userSetup.radiatorCalculation.scaleOutflow.n - pos_x
	points[5]=userSetup.radiatorCalculation.scaleOutflow.p * (values[2]) + userSetup.radiatorCalculation.scaleOutflow.q - pos_y


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

var ruler = []
var ruler_values = []


ruler_values[0]=radiatorCalculation({
				inflowTemp: userInput.radiatorCalculation.inflowTemp, 
				outflowTemp : userInput.radiatorCalculation.outflowTemp, 
				roomTemp : userInput.radiatorCalculation.roomTemp, 
				radiator : userInput.radiatorCalculation.radiator  })


ruler[0] = drawConnectionLine(
	[ ruler_values[0].inflow, ruler_values[0].deltaMean, ruler_values[0].outflow ]
	);


var scale1 = drawLinScale('scaleInflow', 'radiatorCalculation');
var scale2 = drawLinScale('scaleOutflow', 'radiatorCalculation');
var scale3 = drawTableScale('scaleOversizeFactor', 'radiatorCalculation');
var scale4 = drawLinScale('scaleMeanTemp', 'radiatorCalculation')



var allLines = [
  ...scale1.scales,
  ...scale2.scales,
  ...scale3.scales,
  ...scale4.scales,
  ...ruler
];


var allLabels = [
  ...scale1.labels,
  ...scale2.labels,
  ...scale3.labels,
  ...scale4.labels  
];


//definition of the react part may be more elegant made by skilled react user!!
const RadiatorNomograph = function () {
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

export default RadiatorNomograph;
