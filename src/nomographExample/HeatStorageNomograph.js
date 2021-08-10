//last change: 20210509_13:00

//ToDo:  HG delay, loss of connection pipes


import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { drawScale , tableLookup, getAutoScaleParameter} from "./scales.js";
import { stat } from "./settings.js";
import { heatStorageCalculation, value2pos,minMax2parameter,
	pos2value, toUserUnits, toSiUnits, points2intersection, drawRuler , moveScale} from "./coreFunctions.js";

//definition of the react part may be more elegant made by skilled react user!!


export const HeatStorageNomograph1 = function() {
	var i, cb, scaleName, hgName
	var scale = {}

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow

	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage.scaleStorageVolume,
		stat.userSetup.hotWaterStorage.scaleStorageVolume.min, 
		stat.userSetup.hotWaterStorage.scaleStorageVolume.max
		)

	stat.userSetup.hotWaterStorage.scaleStorageVolume.m = 0
	stat.userSetup.hotWaterStorage.scaleStorageVolume.n = stat.userSetup.hotWaterStorage.scaleStorageVolume.positionX * window.innerWidth
	stat.userSetup.hotWaterStorage.scaleStorageVolume.p = cb.p
	stat.userSetup.hotWaterStorage.scaleStorageVolume.q = cb.q

	scale[1] = drawScale(stat.userSetup.hotWaterStorage.scaleStorageVolume);


	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage.scaleUsageVolume, 
		stat.userSetup.hotWaterStorage.scaleUsageVolume.min, 
		stat.userSetup.hotWaterStorage.scaleUsageVolume.max
		)
		
	stat.userSetup.hotWaterStorage.scaleUsageVolume.m = 0
	stat.userSetup.hotWaterStorage.scaleUsageVolume.n = stat.userSetup.hotWaterStorage.scaleUsageVolume.positionX * window.innerWidth
	stat.userSetup.hotWaterStorage.scaleUsageVolume.p = cb.p
	stat.userSetup.hotWaterStorage.scaleUsageVolume.q = cb.q


	scale[2] = drawScale(stat.userSetup.hotWaterStorage.scaleUsageVolume);


	// make a deep copy of stat.userSetup.hotWaterStorage.scaleMinimumTemperature
	for ( i=1; i<=3; i++){
		scaleName = 'scaleMinimumTemperature_' + i 
		//console.log(scaleName)
		stat.userSetup.hotWaterStorage[scaleName] = JSON.parse(JSON.stringify(stat.userSetup.hotWaterStorage.scaleMinimumTemperature));
	}

	i=1
	for ( i=1; i<=3; i++){
		scaleName = 'scaleMinimumTemperature_' + i 
		hgName = 'source' + i
		//rObject = 'scale' + i
		//deep copy scale to standard name
		stat.userSetup.hotWaterStorage.scaleMinimumTemperature = JSON.parse(JSON.stringify(stat.userSetup.hotWaterStorage[scaleName]));

		//console.log(JSON.stringify(stat.userSetup.hotWaterStorage, null, 2));


		getAutoScaleParameter({
			scale1 : stat.userSetup.hotWaterStorage.scaleStorageVolume,
			name1 : 'scaleStorageVolume',
			scale2 : stat.userSetup.hotWaterStorage.scaleUsageVolume,
			name2 : 'scaleUsageVolume',
			scale3 : stat.userSetup.hotWaterStorage.scaleMinimumTemperature,
			name3 : 'scaleMinimumTemperature',
			calcType : 'heatStorageCalculation_minimumTemperature',
			hgName : stat.userInput.hotWaterStorage[hgName],
			cylName : stat.userInput.hotWaterStorage.cylinder,
			nomoName : 'hotWaterStorage',
			verboseLevel : 0
		})
		//console.log(JSON.stringify(stat.userSetup.hotWaterStorage.scaleMinimumTemperature,null,2))

		
		// copy to id-named
		stat.userSetup.hotWaterStorage[scaleName] = JSON.parse(JSON.stringify(stat.userSetup.hotWaterStorage.scaleMinimumTemperature));

		moveScale(stat.userSetup.hotWaterStorage[scaleName], 
			i * stat.userSetup.hotWaterStorage[scaleName].xSpread - stat.userSetup.hotWaterStorage[scaleName].xSpread ,
			0.0 )
		var j = i + 2
		
		//supersede min and max values from setup

		//console.log(i, stat.userSetup.hotWaterStorage.scaleMinimumTemperature.min);
		stat.userSetup.hotWaterStorage[scaleName].min = stat.userSetup.hotWaterStorage.scaleMinimumTemperature.min
		stat.userSetup.hotWaterStorage[scaleName].max = stat.userSetup.hotWaterStorage.scaleMinimumTemperature.max
		//supersede headline
		stat.userSetup.hotWaterStorage[scaleName].head = stat.userSetup.hotWaterStorage[scaleName].head[i]
		
		
		scale[j] = drawScale(stat.userSetup.hotWaterStorage[scaleName]) ;
		//console.log(scale[j]);
	}

	console.log(scale)


	// scale 6: usage time is only dependent on drawoff volume and flowrate, so no auto position is possible or needed.
	// just copy the scale and paste some parameter from user input
	
	stat.userSetup.hotWaterStorage.scaleUsageTime.type = stat.userSetup.hotWaterStorage.scaleUsageVolume.type
	stat.userSetup.hotWaterStorage.scaleUsageTime.xType = stat.userSetup.hotWaterStorage.scaleUsageVolume.xType
	stat.userSetup.hotWaterStorage.scaleUsageTime.positionX = stat.userSetup.hotWaterStorage.scaleUsageVolume.positionX
	stat.userSetup.hotWaterStorage.scaleUsageTime.positionY = stat.userSetup.hotWaterStorage.scaleUsageVolume.positionY
	stat.userSetup.hotWaterStorage.scaleUsageTime.height = stat.userSetup.hotWaterStorage.scaleUsageVolume.height
	stat.userSetup.hotWaterStorage.scaleUsageTime.headSize = stat.userSetup.hotWaterStorage.scaleUsageVolume.headSize
	stat.userSetup.hotWaterStorage.scaleUsageTime.labelSize = stat.userSetup.hotWaterStorage.scaleUsageVolume.labelSize
	stat.userSetup.hotWaterStorage.scaleUsageTime.reverse = stat.userSetup.hotWaterStorage.scaleUsageVolume.reverse
	
	//minMax2parameter(scaleProps, min, max)
	
	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage.scaleUsageTime,
		(stat.userSetup.hotWaterStorage.scaleUsageVolume.min * 0.001 ) / (stat.userInput.hotWaterStorage.userFlowRate * 60),
		(stat.userSetup.hotWaterStorage.scaleUsageVolume.max * 0.001 ) / (stat.userInput.hotWaterStorage.userFlowRate * 60)
		)
	
	//console.log(cb)


	stat.userSetup.hotWaterStorage.scaleUsageTime.m = cb.m
	stat.userSetup.hotWaterStorage.scaleUsageTime.n = cb.n
	stat.userSetup.hotWaterStorage.scaleUsageTime.p = cb.p 
	stat.userSetup.hotWaterStorage.scaleUsageTime.q = cb.q

	
	
	scale[6] = drawScale(stat.userSetup.hotWaterStorage.scaleUsageTime);
    //console.log(scale[6])
    
    
	//console.log(stat.userSetup.hotWaterStorage.scaleUsageTime)
	//ruler, calculate values and insert in userInput
	
	cb = heatStorageCalculation({
			scaleStorageVolume : stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume,
			scaleUsageVolume : stat.userInput.hotWaterStorage.userDrawOff,
			calcType : 'heatStorageCalculation_minimumTemperature',
			hgName : 'heatGenerator1',
			cylName : 'storageCylinder1',
			nomoName : 'hotWaterStorage',
			verbose : false,
			vverbose : false
		})
		
	stat.userInput.hotWaterStorage.minimumTemperature_1 = cb.cylMinTemp

	console.log( 'Ruler1 ' +
		' Power: ' + cb.hgNomPower +
		' cylVolume: ' + stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume +
		' draw-off: ' + stat.userInput.hotWaterStorage.userDrawOff +
		' end temp: ' + stat.userInput.hotWaterStorage.minimumTemperature_1
		)


	cb = heatStorageCalculation({
			scaleStorageVolume : stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume,
			scaleUsageVolume : stat.userInput.hotWaterStorage.userDrawOff,
			calcType : 'heatStorageCalculation_minimumTemperature',
			hgName : 'heatGenerator2',
			cylName : 'storageCylinder1',
			nomoName : 'hotWaterStorage',
			verbose : false,
			vverbose : false
		})
	stat.userInput.hotWaterStorage.minimumTemperature_2 = cb.cylMinTemp
	cb = heatStorageCalculation({
			scaleStorageVolume : stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume,
			scaleUsageVolume : stat.userInput.hotWaterStorage.userDrawOff,
			calcType : 'heatStorageCalculation_minimumTemperature',
			hgName : 'heatGenerator3',
			cylName : 'storageCylinder1',
			nomoName : 'hotWaterStorage',
			verbose : false,
			vverbose : false
		})
	stat.userInput.hotWaterStorage.minimumTemperature_3 = cb.cylMinTemp
	


	var ruler = drawRuler([
		stat.userSetup.hotWaterStorage.scaleStorageVolume,
		stat.userSetup.hotWaterStorage.scaleUsageVolume,
		stat.userSetup.hotWaterStorage.scaleMinimumTemperature_1,
		stat.userSetup.hotWaterStorage.scaleMinimumTemperature_2,
		stat.userSetup.hotWaterStorage.scaleMinimumTemperature_3],
		[
		toUserUnits( stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume , stat.userSetup.hotWaterStorage.scaleStorageVolume.unit ),
		toUserUnits( stat.userInput.hotWaterStorage.userDrawOff, stat.userSetup.hotWaterStorage.scaleUsageVolume.unit ) ,
		toUserUnits( stat.userInput.hotWaterStorage.minimumTemperature_1 ,stat.userSetup.hotWaterStorage.scaleMinimumTemperature_1.unit ),
		toUserUnits( stat.userInput.hotWaterStorage.minimumTemperature_2 ,stat.userSetup.hotWaterStorage.scaleMinimumTemperature_2.unit ),
		toUserUnits( stat.userInput.hotWaterStorage.minimumTemperature_3 ,stat.userSetup.hotWaterStorage.scaleMinimumTemperature_3.unit ),
		]
		);

	var allLines = [
	  ...scale[1].scales,
	  ...scale[2].scales,
	  ...scale[3].scales,
	  ...scale[4].scales,
	  ...scale[5].scales,
	  ...scale[6].scales,
	  ...ruler
	];


	var allLabels = [
	  ...scale[1].labels,
	  ...scale[2].labels,
	  ...scale[3].labels,
	  ...scale[4].labels,
	  ...scale[5].labels,
	  ...scale[6].labels
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


export const HeatStorageNomograph3 = function() {


	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow
	var cb

	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage3.scaleHgPower,
		stat.userSetup.hotWaterStorage3.scaleHgPower.min, 
		stat.userSetup.hotWaterStorage3.scaleHgPower.max
		)

	stat.userSetup.hotWaterStorage3.scaleHgPower.m = 0
	stat.userSetup.hotWaterStorage3.scaleHgPower.n = stat.userSetup.hotWaterStorage3.scaleHgPower.positionX * window.innerWidth
	stat.userSetup.hotWaterStorage3.scaleHgPower.p = cb.p
	stat.userSetup.hotWaterStorage3.scaleHgPower.q = cb.q

  // change positionX based on hgNomPower
  stat.userSetup.hotWaterStorage3.scaleStorageVolume.positionX = 
		stat.userSetup.hotWaterStorage3.scaleStorageVolume.positionX
			- 0.002 * stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage3.source].hgNomTemp
	//console.log(stat.userSetup.hotWaterStorage3.scaleStorageVolume.positionX);
	
	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage3.scaleStorageVolume, 
		stat.userSetup.hotWaterStorage3.scaleStorageVolume.min, 
		stat.userSetup.hotWaterStorage3.scaleStorageVolume.max
		)
		
	stat.userSetup.hotWaterStorage3.scaleStorageVolume.m = 0
	stat.userSetup.hotWaterStorage3.scaleStorageVolume.n = (stat.userSetup.hotWaterStorage3.scaleStorageVolume.positionX * window.innerWidth )
	stat.userSetup.hotWaterStorage3.scaleStorageVolume.p = cb.p
	stat.userSetup.hotWaterStorage3.scaleStorageVolume.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.hotWaterStorage3.scaleHgPower);
	scale[2] = drawScale(stat.userSetup.hotWaterStorage3.scaleStorageVolume);

	//console.log(stat.userSetup.hotWaterStorage3)

	//console.log(stat.userInput.hotWaterStorage3)


	getAutoScaleParameter({
		scale1 : stat.userSetup.hotWaterStorage3.scaleHgPower,
		name1 : 'scaleHgPower',
		scale2 : stat.userSetup.hotWaterStorage3.scaleStorageVolume,
		name2 : 'scaleStorageVolume',
		scale3 : stat.userSetup.hotWaterStorage3.scaleUsageVolume,
		name3 : 'scaleUsageVolume',
		userTemp : stat.userInput.hotWaterStorage3.userTemp,
		calcType : 'heatStorageCalculation_usageVolume',
		cylName : stat.userInput.hotWaterStorage3.cylinder,
		hgName : stat.userInput.hotWaterStorage3.source,
		nomoName : 'hotWaterStorage',
		verboseLevel : 0
	})



	scale[3] = drawScale(stat.userSetup.hotWaterStorage3.scaleUsageVolume) ;
	//ruler, calculate values and insert in userInput




	cb = heatStorageCalculation({
			scaleStorageVolume : stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume,
			scaleHgPower : stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage3.source].hgNomPower,
			calcType : 'heatStorageCalculation_hgPower',
			cylName : stat.userInput.hotWaterStorage3.cylinder,
			hgName : stat.userInput.hotWaterStorage3.source,
			nomoName : 'hotWaterStorage',
			verboseLevel : 0
		})
		
	stat.userInput.hotWaterStorage3.userVolume = cb.userVolume
	// insert cheat code here ... calculate single draw off not from simulation, but from scale!!
	
	//console.log(cb)


	console.log( 'Ruler2 ' + 
		' Power: ' + stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage3.source].hgNomPower +
		' cylVolume: ' + stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage.cylinder].cylVolume +
		' draw-off: ' + stat.userInput.hotWaterStorage3.userVolume + 
		' end temp: ' + cb.cylMinTemp
		)
		
	var ruler = drawRuler([
		stat.userSetup.hotWaterStorage3.scaleHgPower,
		stat.userSetup.hotWaterStorage3.scaleStorageVolume,
		stat.userSetup.hotWaterStorage3.scaleUsageVolume,
		],
		[
		toUserUnits( stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage3.source].hgNomPower , stat.userSetup.hotWaterStorage3.scaleHgPower.unit ),
		toUserUnits( stat.userSetup.storageCylinders[stat.userInput.hotWaterStorage3.cylinder].cylVolume , stat.userSetup.hotWaterStorage3.scaleStorageVolume.unit ),
		toUserUnits( stat.userInput.hotWaterStorage3.userVolume , stat.userSetup.hotWaterStorage3.scaleUsageVolume.unit ) ,
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




console.log(stat.userInput.hotWaterStorage3)

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


export const HeatStorageNomograph4 = function() {
// manual scales: draw-off Volume and HgPower, auto scale: reheat Time
//draw-off & Power => time ... single sim
// pivot point : time
//change Power to find draw-off;  sim end err value is time 

	if (stat.userSettings.renderWidth > 0 ){
		window.innerWidth = stat.userSettings.renderWidth
		}
	if (stat.userSettings.renderHeight > 0){
		window.innerHeight = stat.userSettings.renderHeight
	}



	// calculate parameter for scaleStorageVolume and Outflow
	var cb

	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage4.scaleHgPower,
		stat.userSetup.hotWaterStorage4.scaleHgPower.min, 
		stat.userSetup.hotWaterStorage4.scaleHgPower.max
		)

	stat.userSetup.hotWaterStorage4.scaleHgPower.m = 0
	stat.userSetup.hotWaterStorage4.scaleHgPower.n = stat.userSetup.hotWaterStorage4.scaleHgPower.positionX * window.innerWidth
	stat.userSetup.hotWaterStorage4.scaleHgPower.p = cb.p
	stat.userSetup.hotWaterStorage4.scaleHgPower.q = cb.q


	cb = minMax2parameter(
		stat.userSetup.hotWaterStorage4.scaleUsageVolume, 
		stat.userSetup.hotWaterStorage4.scaleUsageVolume.min, 
		stat.userSetup.hotWaterStorage4.scaleUsageVolume.max
		)
		
	stat.userSetup.hotWaterStorage4.scaleUsageVolume.m = 0
	stat.userSetup.hotWaterStorage4.scaleUsageVolume.n = stat.userSetup.hotWaterStorage4.scaleUsageVolume.positionX * window.innerWidth
	stat.userSetup.hotWaterStorage4.scaleUsageVolume.p = cb.p
	stat.userSetup.hotWaterStorage4.scaleUsageVolume.q = cb.q

	var scale = {}

	scale[1] = drawScale(stat.userSetup.hotWaterStorage4.scaleHgPower);
	scale[2] = drawScale(stat.userSetup.hotWaterStorage4.scaleUsageVolume);
	//console.log(stat.userSetup.hotWaterStorage3)
	//console.log(stat.userInput.hotWaterStorage3)

	getAutoScaleParameter({
		scale1 : stat.userSetup.hotWaterStorage4.scaleHgPower,
		name1 : 'scaleHgPower',
		scale2 : stat.userSetup.hotWaterStorage4.scaleUsageVolume,
		name2 : 'scaleUsageVolume',
		scale3 : stat.userSetup.hotWaterStorage4.scaleReheatTime,
		name3 : 'scaleReheatTime',
		userTemp : stat.userInput.hotWaterStorage4.userTemp,     // should be always in SI units!! 
		calcType : 'heatStorageCalculation_reheatTime',
		cylName : stat.userInput.hotWaterStorage4.cylinder,
		hgName : stat.userInput.hotWaterStorage4.source,
		nomoName : 'hotWaterStorage',
		userVolume : 0.5,						// it is a start value for the iteration part
		verboseLevel : 0						// be careful with values > 2 !!! produces a lot of output
	})


	scale[3] = drawScale(stat.userSetup.hotWaterStorage4.scaleReheatTime) ;

	//ruler, calculate values and insert in userInput


	cb = heatStorageCalculation({
			scaleHgPower : stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage4.source].hgNomPower,
			scaleUsageVolume : stat.userInput.hotWaterStorage4.userVolume,
			userTemp : stat.userInput.hotWaterStorage4.userTemp,
			calcType : 'heatStorageCalculation_reheatTime',
			cylName : stat.userInput.hotWaterStorage4.cylinder,
			hgName : stat.userInput.hotWaterStorage4.source,
			nomoName : 'hotWaterStorage',
			verboseLevel : 0
		})
	//console.log(typeof(cb.reheatTime))
	
	if ( ! isNaN(cb.reheatTime) ){
	
		stat.userInput.hotWaterStorage4.reheatTime = cb.reheatTime
		// insert cheat code here ... calculate single draw off not from simulation, but from scale!!

		console.log( 'Ruler3 ' + 
			' Power: ' + stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage4.source].hgNomPower +
			' reheat time: ' + stat.userInput.hotWaterStorage4.reheatTime +
			' draw-off: ' + cb.userVolume + 
			' minimum temp: ' + cb.cylMinTemp
			)
		var ruler = drawRuler([
			stat.userSetup.hotWaterStorage4.scaleHgPower,
			//stat.userSetup.hotWaterStorage4.scaleReheatTime,
			stat.userSetup.hotWaterStorage4.scaleUsageVolume,
			],
			[
			toUserUnits( stat.userSetup.heatGenerators[stat.userInput.hotWaterStorage4.source].hgNomPower , stat.userSetup.hotWaterStorage4.scaleHgPower.unit ),
			//toUserUnits( stat.userInput.hotWaterStorage4.reheatTime , stat.userSetup.hotWaterStorage4.scaleReheatTime.unit ),
			toUserUnits( stat.userInput.hotWaterStorage4.userVolume , stat.userSetup.hotWaterStorage4.scaleUsageVolume.unit ) ,
			]
			);
	}
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

console.log(scale[3])



	const [lines] = React.useState(allLines);
	const [labels] = React.useState(allLabels);
	
	
	
	for ( var i = 0; i < labels.length; i++){
		if ( typeof(labels[i].offsetX) !== 'number' || isNaN(labels[i].offsetX)){ labels[i].offsetX = 0 }
		if ( typeof(labels[i].offsetY) !== 'number' || isNaN(labels[i].offsetY)){ labels[i].offsetY = 0 }
	}


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
						rotation={label.rotation}
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
