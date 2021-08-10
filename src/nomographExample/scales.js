//last change: 20210508_21:00

import { 
	niceRounding, 
	interpolate, 
	minMax2parameter, 
	heatStorageCalculation, 
	value2pos,pos2value, 
	toUserUnits, 
	toSiUnits,
	points2intersection, 
	points2parameter,
	expansionVesselCalculation,
	floorHeatingCalculation,
	polynom,
	pipeCalculation,
	uValueCalculation,
	massFlowCalculation
	} from "./coreFunctions.js";

import { stat, userSetup , userSettings} from "./settings.js";


function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1];
    });
}


function linTesselation(min, max, tessArray){
	// ouputs an array with all numbers, devidable by numbers from tessArray.
	//console.log(min,max,tessArray);
	var linTess = []
	var i,j,value
	j=0

	// get first faktor:

	for (i = 0; i < tessArray.length ; i++){
		value = Math.round(min / tessArray[i]) //+1 

		if ( (value * tessArray[i]) < min){ 
			value++
			}

	
			linTess[j] = value * tessArray[i]

			value++
			j++
			
		while ( value * tessArray[i] <= max ){
			linTess[j] = value * tessArray[i]
			value++
			j++
		} 
	}

	//console.log(linTess);
	return linTess;
	}

function logTesselation(min, max, tessArray) {

  var logTess = [];
  var i
  var LogStart = Math.floor(Math.log10(min));
  var LogEnd = Math.floor(Math.log10(max));
	var tesselationValue
  var index = 0;
  for (i = LogStart; i <= LogEnd; i++) {
    for (const j of tessArray) {
      tesselationValue = j * Math.pow(10, i);
      if (tesselationValue >= min && tesselationValue <= max) {
        logTess[index] = tesselationValue;
        index++;
      }
    }
  }
  return logTess;
}

export function tableLookup(value, table, field){
	//table is a object. contains: val , x , y
	//value is a value to lookup 
	//field is the name of the output wanted!
	

	var length, i, order, end=0, cb
	length=Object.keys(table).length

	if ( table[0].val > table[1].val ){ order = 'reverse'}

	if ( order === 'reverse' ){
		i=length - 1
		if ( (value > table[0].val) || (value < table[length - 1].val) ){
			console.log('WARNING! table-lookup was extrapolated.') 
			console.log('WARNING: ' + value + ' not in ' + table[0].val + '..' + table[length - 1].val )
			}

		end = 0
		while ( end === 0){
			if ( i > 0 && table[i].val <= value ){ 
				i-- 
				} else { 
				end = 1
				}
			}
		}		


	if ( order !== 'reverse' ){
		i=0
		if ( (value < table[0].val) || (value > table[length - 1].val) ){
			//console.log('WARNING! table-lookup was extrapolated.') 
			//console.log('WARNING! ' + value + ' not in ' + table[0].val + '..' + table[length - 1].val )
			}
			
		end = 0
		while ( end === 0){
			if ( i < length && table[i].val <= value ){ 
				i++ 
				} else { 
				end = 1
				}
			}
		}
		
	if ( order === 'reverse' ){ i = i + 1 }


	if (i === 0){

		cb = interpolate(
		table[i].val, 
		table[i][field], 
		table[i+1].val, 
		table[i+1][field], 
		value)
		}

	if ( i > 0 && i < length){

		cb = interpolate(
		table[i-1].val, 
		table[i-1][field], 
		table[i].val, 
		table[i][field], 
		value)
		} 
		
	if ( i >= length){
		cb = interpolate(
		table[i-2].val, 
		table[i-2][field], 
		table[i-1].val, 
		table[i-1][field], 
		value)
		}
	//console.log(order,i,cb,table[i])

	//if ( field === 'y' ) {console.log(cb) }
	return (cb)
	}

// functions wich create linear or logarithmic scales from given parameters
// return are two objects, with lines and labels.

export function getAutoScaleParameter(input){
	// scale 3 will be new arranged
	//console.log(JSON.stringify(input, null, 2))
	// m, n, p, q and values in table are already scled with user units !!

	var parameterSet=[]
	var i = 0, cb = []

	var spread = 0.02
	// get parameterSet with values, wich will be translated  to xy coordinates of points
	for (var d = 0.05 ; d <= 0.95 ; d = d + 0.051 ){    // bug: infinite loop, if d=0.1

		//console.log(d)
		input.scale1.value = pos2value(input.scale1 , (  window.innerHeight * ( d )) )   // value will be in user units
		input.scale2.value = pos2value(input.scale2 , (  window.innerHeight * ( d )) )

		parameterSet[i]= {}
		if ( input.verboseLevel > 1 ){
			console.log('first line')
		}


		switch (String(input.nomoName)) {
			case 'hotWaterStorage' :
				cb[0] = heatStorageCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					hgName : input.hgName,
					cylName : input.cylName,
					nomoName : input.nomoName,
					userTemp : input.userTemp,
					verboseLevel : input.verboseLevel
				})
				break;
			case 'expansionVessel' :
				cb[0] = expansionVesselCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;
			case 'floorHeating' :
				cb[0] = floorHeatingCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;
			case 'pipeCalculation' :
				cb[0] = pipeCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;				
			case 'uValue' :
				cb[0] = uValueCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;	
			case 'massFlowRate' :
				cb[0] = massFlowCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;							
			default :
				console.log('WARNING: This nomoName not defined. Actual type: ' + input.nomoName)
		}

		
		if ( input.verboseLevel > 1 ){
			console.log( cb )
		}
	

		//input1 is modified and value3 is pivot-point.
		//may be later make not intersection from 2 lines, but from 3 to get additional value accuracy !
		input.scale1.value = input.scale1.value * ( 1 + spread )



		switch (String(input.calcType)) {
			case 'heatStorageCalculation_usageTime' :
				input.scale3.value = toUserUnits(cb[0].usageTime ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_reheatTime' :
				input.scale3.value = toUserUnits(cb[0].reheatTime ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_minimumTemperature' :
				input.scale3.value = toUserUnits(cb[0].cylMinTemp ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_hgPower' :
				input.scale3.value = toUserUnits(cb[0].hgNomPower ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_usageVolume' :
				input.scale3.value = toUserUnits(cb[0].userVolume , input.scale3.unit)			//value in SI units
				break;
			case 'expansionVessel_VesselVolume' :
				input.scale3.value = toUserUnits(cb[0].expansionVesselVolume ,input.scale3.unit ) 
				break;
			case 'expansionVessel_MaximumTemperature' :
				input.scale3.value = toUserUnits(cb[0].maxTemp ,input.scale3.unit ) 
				break;
			case 'floorHeating1_pipeLength' :
				input.scale3.value = toUserUnits(cb[0].pipeLength ,input.scale3.unit ) 
				break;				
			case 'floorHeating1_Power' :
				input.scale3.value = toUserUnits(cb[0].q ,input.scale3.unit ) 
				break;				
			case 'floorHeating1_pipeVolume' :
				input.scale3.value = toUserUnits(cb[0].pipeVolume ,input.scale3.unit ) 
				break;
			case 'floorHeating1_floorTemp' :
				input.scale3.value = toUserUnits(cb[0].floorTemp ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_velocity' :
				input.scale3.value = toUserUnits(cb[0].velocity ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_pressureDrop' :
				input.scale3.value = toUserUnits(cb[0].pressureDrop ,input.scale3.unit ) 
				break;
			case 'floorHeating_pressureDrop' :
				input.scale3.value = toUserUnits(cb[0].pressureDrop ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_volume' :
				input.scale3.value = toUserUnits(cb[0].pipeVolume ,input.scale3.unit ) 
				break;
			case 'uCalculation_floorValue' :
				input.scale3.value = toUserUnits(cb[0].u ,input.scale3.unit ) 
				break;
			case 'floorHeating4_Power' :
				input.scale3.value = toUserUnits(cb[0].q ,input.scale3.unit ) 
				break;				
			case 'floorHeating4_floorTemp' :
				input.scale3.value = toUserUnits(cb[0].floorTemp ,input.scale3.unit ) 
				break;
			case 'massFlowRate_volumeFlow' :
				input.scale3.value = toUserUnits(cb[0].volumeFlow ,input.scale3.unit ) 
				break;				
			default :
				console.log('WARNING: This calcType not defined. Actual type: ' + input.calcType )
		}



		// get value 2, wich fits to value1 and value3

		if ( typeof(input.scale3.value) === 'number' ){

			if ( input.verboseLevel > 1 ){
				console.log('second line')
			}


			switch (String(input.nomoName)) {
				case 'hotWaterStorage' :
					cb[1] = heatStorageCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// conversion to SI for calculatino
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						userTemp : input.userTemp,
						userVolume : input.userVolume,
						calcType : input.calcType,
						hgName : input.hgName,
						cylName : input.cylName,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'expansionVessel' :
					cb[1] = expansionVesselCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'floorHeating' :
					cb[1] = floorHeatingCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'pipeCalculation' :
					cb[1] = pipeCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'uValue' :
					cb[1] = uValueCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'massFlowRate' :
					cb[1] = massFlowCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})					
					break;
				default :
					console.log('WARNING: This nomoName not defined. Actual type: ' + input.nomoName)
			}
		}


		input.scale1.value = input.scale1.value / ( ( 1 + spread ) * ( 1 + spread ) )

		switch (String(input.calcType)) {
			case 'heatStorageCalculation_usageTime' :
				input.scale3.value = toUserUnits(cb[0].usageTime ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_reheatTime' :
				input.scale3.value = toUserUnits(cb[0].reheatTime ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_minimumTemperature' :
				input.scale3.value = toUserUnits(cb[0].cylMinTemp ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_hgPower' :
				input.scale3.value = toUserUnits(cb[0].hgNomPower ,input.scale3.unit ) 
				break;
			case 'heatStorageCalculation_usageVolume' :
				input.scale3.value = toUserUnits(cb[0].userVolume , input.scale3.unit)			//value in SI units
				break;
			case 'expansionVessel_VesselVolume' :
				input.scale3.value = toUserUnits(cb[0].expansionVesselVolume ,input.scale3.unit ) 
				break;
			case 'expansionVessel_MaximumTemperature' :
				input.scale3.value = toUserUnits(cb[0].maxTemp ,input.scale3.unit ) 
				break;
			case 'floorHeating1_pipeLength' :
				input.scale3.value = toUserUnits(cb[0].pipeLength ,input.scale3.unit ) 
				break;				
			case 'floorHeating1_pipeVolume' :
				input.scale3.value = toUserUnits(cb[0].pipeVolume ,input.scale3.unit ) 
				break;				
			case 'floorHeating1_Power' :
				input.scale3.value = toUserUnits(cb[0].q ,input.scale3.unit ) 
				break;
			case 'floorHeating1_floorTemp' :
				input.scale3.value = toUserUnits(cb[0].floorTemp ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_velocity' :
				input.scale3.value = toUserUnits(cb[0].velocity ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_pressureDrop' :
				input.scale3.value = toUserUnits(cb[0].pressureDrop ,input.scale3.unit ) 
				break;
			case 'floorHeating_pressureDrop' :
				input.scale3.value = toUserUnits(cb[0].pressureDrop ,input.scale3.unit ) 
				break;
			case 'pipeCalculation_volume' :
				input.scale3.value = toUserUnits(cb[0].pipeVolume ,input.scale3.unit ) 
				break;
			case 'uCalculation_floorValue' :
				input.scale3.value = toUserUnits(cb[0].u ,input.scale3.unit ) 
				break;
			case 'floorHeating4_Power' :
				input.scale3.value = toUserUnits(cb[0].q ,input.scale3.unit ) 
				break;
			case 'floorHeating4_floorTemp' :
				input.scale3.value = toUserUnits(cb[0].floorTemp ,input.scale3.unit ) 
				break;
			case 'massFlowRate_volumeFlow' :
				input.scale3.value = toUserUnits(cb[0].volumeFlow ,input.scale3.unit ) 
				break;
			default :
				console.log('WARNING: This calcType not defined. Actual type: ' + input.calcType )
		}


		// get value 2, wich fits to value1 and value3

		if ( typeof(input.scale3.value) === 'number' ){

			if ( input.verboseLevel > 1 ){
				console.log('third line')
			}


			switch (String(input.nomoName)) {
				case 'hotWaterStorage' :
					cb[2] = heatStorageCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// conversion to SI for calculatino
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						userTemp : input.userTemp,
						userVolume : input.userVolume,
						calcType : input.calcType,
						hgName : input.hgName,
						cylName : input.cylName,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'expansionVessel' :
					cb[2] = expansionVesselCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'floorHeating' :
					cb[2] = floorHeatingCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'pipeCalculation' :
					cb[2] = pipeCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'uValue' :
					cb[2] = uValueCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				case 'massFlowRate' :
					cb[2] = massFlowCalculation({
						[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
						[input.name3] : toSiUnits(input.scale3.value , input.scale3.unit),
						startvalue :  toSiUnits(input.scale2.value , input.scale2.unit),
						calcType : input.calcType,
						nomoName : input.nomoName,
						verboseLevel : input.verboseLevel
					})
					break;
				default :
					console.log('WARNING: This nomoName not defined. Actual type: ' + input.nomoName)
			}


			if ( input.verboseLevel > 1 ){
				console.log( cb )
			}
			
			// different error threshold for different nomographs needed !!
			var threshold		
			switch (String(input.nomoName)) {
				case 'hotWaterStorage' : threshold = 0.01; break;
				case 'expansionVessel' : threshold = 1E-5; break;
				case 'floorHeating' : threshold = 0.01; break;
				case 'pipeCalculation' : threshold = 0.01; break;
				case 'uValue' : threshold = 0.001; break;
				case 'massFlowRate' : threshold = 0.001; break;				
				default : 
					console.log('WARNING: This nomoName not defined. Actual type: ' + input.nomoName)
			}			
			
			
			
			var errorRate = 3
			if ( Math.abs(cb[0].error) <= threshold && cb[0].status === 'success' ){ errorRate-- }
			if ( Math.abs(cb[1].error) <= threshold && cb[1].status === 'success' ){ errorRate-- }
			if ( Math.abs(cb[2].error) <= threshold && cb[2].status === 'success' ){ errorRate-- }


			if ( errorRate <= 1 ){
				//console.log(cb[1].error)
				var valuename1, valuename2, valuename3

				//Mapping values of cb to values in parameterset!


				switch (String(input.calcType)) {
					case 'heatStorageCalculation_usageTime' :
						if ( input.name1 === 'scaleStorageVolume' ){valuename1 = 'cylVolume' } else { console.log('WARNING! Wrong scaleName')}
						if ( input.name2 === 'scaleFlowRate' ){valuename2 = 'userFlowRateSetting' } else { console.log('WARNING! Wrong scaleName')}
						if ( input.name3 === 'scaleUsageTime' ){valuename3 = 'usageTime' } else { console.log('WARNING! Wrong scaleName')}
						break;
					case 'heatStorageCalculation_reheatTime' :
						if ( input.name1 === 'scaleHgPower' ){valuename1 = 'hgNomPower' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleUsageVolume' ){valuename2 = 'userVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleReheatTime' ){valuename3 = 'reheatTime' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'heatStorageCalculation_minimumTemperature' :
						if ( input.name1 === 'scaleStorageVolume' ){valuename1 = 'cylVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleUsageVolume' ){valuename2 = 'userVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleMinimumTemperature' ){valuename3 = 'cylMinTemp' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'heatStorageCalculation_hgPower' :
						if ( input.name1 === 'scaleStorageVolume' ){valuename1 = 'cylVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleUsageVolume' ){valuename2 = 'userVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleHgPower' ){valuename3 = 'hgNomPower' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'heatStorageCalculation_usageVolume' :
						if ( input.name1 === 'scaleHgPower' ){valuename1 = 'hgNomPower' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleStorageVolume' ){valuename2 = 'cylVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleUsageVolume' ){valuename3 = 'userVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'expansionVessel_VesselVolume' :
						if ( input.name1 === 'scaleSysVolume' ){valuename1 = 'systemVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scalePrechargePressure' ){valuename2 = 'prechargePressure' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleExpansionVesselVolume' ){valuename3 = 'expansionVesselVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'expansionVessel_MaximumTemperature' :
						if ( input.name1 === 'scaleSysVolume' ){valuename1 = 'systemVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleExpansionVesselVolume' ){valuename2 = 'expansionVesselVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleMaximumTemp' ){valuename3 = 'maxTemp' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating1_pipeLength' :						
						if ( input.name1 === 'scalePipeDistance' ){valuename1 = 'pipeDistance' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFloorArea' ){valuename2 = 'floorArea' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePipeLength' ){valuename3 = 'pipeLength' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating1_pipeVolume' :						
						if ( input.name1 === 'scalePipeDistance' ){valuename1 = 'pipeDistance' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFloorArea' ){valuename2 = 'floorArea' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePipeVolume' ){valuename3 = 'pipeVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating1_Power' :						
						if ( input.name1 === 'scaleMeanTemp' ){valuename1 = 'mwt' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFloorCoverResistance' ){valuename2 = 'R_lambdaB' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePower' ){valuename3 = 'q' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating1_floorTemp' :						
						if ( input.name1 === 'scaleMeanTemp' ){valuename1 = 'mwt' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFloorCoverResistance' ){valuename2 = 'R_lambdaB' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleFloorTemp' ){valuename3 = 'floorTemp' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating4_Power' :						
						if ( input.name1 === 'scaleMeanTemp' ){valuename1 = 'mwt' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scalePipeDistance' ){valuename2 = 'T' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePower' ){valuename3 = 'q' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating4_floorTemp' :						
						if ( input.name1 === 'scaleMeanTemp' ){valuename1 = 'mwt' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scalePipeDistance' ){valuename2 = 'T' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleFloorTemp' ){valuename3 = 'floorTemp' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'pipeCalculation_velocity' :						
						if ( input.name1 === 'scaleDiameter' ){valuename1 = 'diameter' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFlowRate' ){valuename2 = 'flowRate' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleVelocity' ){valuename3 = 'velocity' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'pipeCalculation_pressureDrop' :						
						if ( input.name1 === 'scaleDiameter' ){valuename1 = 'diameter' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFlowRate' ){valuename2 = 'flowRate' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePressureDrop' ){valuename3 = 'pressureDrop' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'floorHeating_pressureDrop' :						
						if ( input.name1 === 'scalePipeLength' ){valuename1 = 'length' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleFlowRate' ){valuename2 = 'flowRate' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scalePressureDrop' ){valuename3 = 'pressureDrop' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
						break;
					case 'pipeCalculation_volume' :						
						if ( input.name1 === 'scaleDiameter' ){valuename1 = 'pipeDiameter' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scalePipeLength' ){valuename2 = 'pipeLength' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleVolume' ){valuename3 = 'pipeVolume' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
					break;
					case 'uCalculation_floorValue' :						
						if ( input.name1 === 'scaleRelativePerimeter' ){valuename1 = 'relativePerimeter' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleWallThicknes' ){valuename2 = 'wallThickness' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleUValue' ){valuename3 = 'u' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
					break;
					case 'massFlowRate_volumeFlow' :						
						if ( input.name1 === 'scalePower' ){valuename1 = 'power' } else { console.log('WARNING! Wrong scaleName: ' + input.name1)}
						if ( input.name2 === 'scaleTemperature' ){valuename2 = 'temperature' } else { console.log('WARNING! Wrong scaleName: ' + input.name2)}
						if ( input.name3 === 'scaleVolumeFlow' ){valuename3 = 'volumeFlow' } else { console.log('WARNING! Wrong scaleName: ' + input.name3)}
					break;
					default :
						console.log('WARNING: This calcType not defined. Actual type: ' + input.calcType )
				}




				parameterSet[i].value1_0 = toUserUnits( cb[0][valuename1], input.scale1.unit)	//value in table is in user units
				parameterSet[i].value2_0 = toUserUnits( cb[0][valuename2], input.scale2.unit)
				parameterSet[i].value3_0 = toUserUnits( cb[0][valuename3], input.scale3.unit)

				parameterSet[i].value1_1 = toUserUnits( cb[1][valuename1], input.scale1.unit)
				parameterSet[i].value2_1 = toUserUnits( cb[1][valuename2], input.scale2.unit)
				parameterSet[i].value3_1 = toUserUnits( cb[1][valuename3], input.scale3.unit)

				parameterSet[i].value1_2 = toUserUnits( cb[2][valuename1], input.scale1.unit)
				parameterSet[i].value2_2 = toUserUnits( cb[2][valuename2], input.scale2.unit)
				parameterSet[i].value3_2 = toUserUnits( cb[2][valuename3], input.scale3.unit)

				parameterSet[i].error_0 = cb[0].error
				parameterSet[i].error_1 = cb[1].error
				parameterSet[i].error_2 = cb[2].error

				parameterSet[i].status_0 = cb[0].status + ' ' + cb[0].status2
				parameterSet[i].status_1 = cb[1].status + ' ' + cb[1].status2
				parameterSet[i].status_2 = cb[2].status + ' ' + cb[2].status2
					
			} else {
				//if ( Math.abs(cb[0].error) >= 0.01 || Math.abs(cb[1].error) >= 0.01 ){ 
					parameterSet[i].message = 'residual errorRate to big! ; ' + cb[0].error + ' ; ' + cb[1].error + ' ; ' + cb[2].error 
					parameterSet[i].status_0 = cb[0].status + ' ' + cb[0].status2
					parameterSet[i].status_1 = cb[1].status + ' ' + cb[1].status2
					parameterSet[i].status_2 = cb[2].status + ' ' + cb[2].status2
			}
		

			
		} else {
			parameterSet[i].message = 'value 3 could not be calculated. something in math backend function is wrong'
			parameterSet[i].status_0 = cb[0].status + ' ' + cb[0].status2
			parameterSet[i].status_1 = cb[1].status + ' ' + cb[1].status2
			parameterSet[i].status_2 = cb[2].status + ' ' + cb[2].status2
		}
		parameterSet[i].errorRate = errorRate
		
		i++
	}


	//making 3 intersction points from 3 lines --> calculated center of triangle => x/y   calculate diameter of triangle => error 


	for (i=0; i<parameterSet.length; i++){

		if ( typeof(parameterSet[i].value1_0) === 'number' ){
			
			// intersection of #0 and #1
			if ( Math.abs(parameterSet[i].error_0) <= threshold && Math.abs(parameterSet[i].error_1) <= threshold){
				//console.log(input)
				cb = points2intersection([
				{ x : input.scale1.positionX * window.innerWidth, 
					y : value2pos(input.scale1 , parameterSet[i].value1_0) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_0) },
				{ x : input.scale1.positionX * window.innerWidth,
					y : value2pos(input.scale1 , parameterSet[i].value1_1) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_1) }
				])

				parameterSet[i].x1 = cb.x
				parameterSet[i].y1 = cb.y
			}


			// intersection of #0 and #2
			if ( Math.abs(parameterSet[i].error_0) <= threshold && Math.abs(parameterSet[i].error_2) <= threshold){
				cb = points2intersection([
				{ x : input.scale1.positionX * window.innerWidth, 
					y : value2pos(input.scale1 , parameterSet[i].value1_0) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_0) },
				{ x : input.scale1.positionX * window.innerWidth,
					y : value2pos(input.scale1 , parameterSet[i].value1_2) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_2) }
				])

				parameterSet[i].x2 = cb.x
				parameterSet[i].y2 = cb.y 
			}

			// intersection of #1 and #2
			if ( Math.abs(parameterSet[i].error_1) <= threshold && Math.abs(parameterSet[i].error_2) <= threshold){
				cb = points2intersection([
				{ x : input.scale1.positionX * window.innerWidth, 
					y : value2pos(input.scale1 , parameterSet[i].value1_1) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_1) },
				{ x : input.scale1.positionX * window.innerWidth,
					y : value2pos(input.scale1 , parameterSet[i].value1_2) },
				{ x : input.scale2.positionX * window.innerWidth,
					y : value2pos(input.scale2 , parameterSet[i].value2_2) }
				])
				
				parameterSet[i].x3 = cb.x
				parameterSet[i].y3 = cb.y
			}

			
			if ( parameterSet[i].errorRate === 0){
				parameterSet[i].x = ( parameterSet[i].x1 + parameterSet[i].x2 + parameterSet[i].x3 ) / 3
				parameterSet[i].y = ( parameterSet[i].y1 + parameterSet[i].y2 + parameterSet[i].y3 ) / 3

				parameterSet[i].a = Math.sqrt(Math.pow(parameterSet[i].x1 - parameterSet[i].x2 ,2) + Math.pow(parameterSet[i].y1 - parameterSet[i].y2 ,2))
				parameterSet[i].b = Math.sqrt(Math.pow(parameterSet[i].x2 - parameterSet[i].x3 ,2) + Math.pow(parameterSet[i].y2 - parameterSet[i].y3 ,2))
				parameterSet[i].c = Math.sqrt(Math.pow(parameterSet[i].x3 - parameterSet[i].x1 ,2) + Math.pow(parameterSet[i].y3 - parameterSet[i].y1 ,2))

				parameterSet[i].s = (parameterSet[i].a + parameterSet[i].b + parameterSet[i].c)/2
				if ( parameterSet[i].s > 0 ){
					parameterSet[i].r = Math.sqrt(((parameterSet[i].s - parameterSet[i].a) * (parameterSet[i].s - parameterSet[i].b) * (parameterSet[i].s - parameterSet[i].c))/parameterSet[i].s)
					} else { parameterSet[i].r = 0
				}
			}


			if ( parameterSet[i].errorRate === 1 ){
				console.log('WARNING! One control line could not be calculated ')
				if( typeof(parameterSet[i].x1) === 'number' ){
					parameterSet[i].x = parameterSet[i].x1
					parameterSet[i].y = parameterSet[i].y1
					}
				if( typeof(parameterSet[i].x2) === 'number' ){
					parameterSet[i].x = parameterSet[i].x2
					parameterSet[i].y = parameterSet[i].y2
					}
				if( typeof(parameterSet[i].x3) === 'number' ){
					parameterSet[i].x = parameterSet[i].x3
					parameterSet[i].y = parameterSet[i].y3
					}
				parameterSet[i].r = -1
			}
			
			if (parameterSet[i].errorRate === 2 || parameterSet[i].errorRate === 3){ console.log('WARNING! No control line could be calculated! ') }
		}			
	}
	
	
	
	// bugfix for definition hole!!
	if ( input.calcType === 'expansionVessel_VesselVolume' ){
		for (i=0; i<parameterSet.length; i++){
			if ( parameterSet[i].x >= input.scale2.n ){
				parameterSet[i].message = 'bugfix for values on other side of definition hole'
				delete parameterSet[i].value1_0
				delete parameterSet[i].value1_1
				delete parameterSet[i].value2_0
				delete parameterSet[i].value2_1
				delete parameterSet[i].value3_0
				delete parameterSet[i].value3_1
				delete parameterSet[i].x
				delete parameterSet[i].y
				
			}
		}
	}

	if( input.verboseLevel > 0 ){
		console.log(parameterSet)
	}


	if( input.verboseLevel > 0 ){
		for (i=0; i<parameterSet.length; i++){
			console.log( 
				i,
				parameterSet[i].value3_0, 
				parameterSet[i].x, 
				parameterSet[i].y, 
				parameterSet[i].s, 
				)
		}
	}


	if( input.verboseLevel > 1 ){
		for (i=0; i<parameterSet.length; i++){
			//if ( typeof(parameterSet[i].value3_0) === 'number' ){
				console.log( 
					i,
					parameterSet[i].value3_0 , 
					parameterSet[i].x1, 
					parameterSet[i].y1, 
					parameterSet[i].error_0, 
					)
				console.log( 
					i,
					parameterSet[i].value3_0 , 
					parameterSet[i].x2, 
					parameterSet[i].y2, 
					parameterSet[i].error_1, 
					)
				console.log( 
					i,
					parameterSet[i].value3_0 , 
					parameterSet[i].x3, 
					parameterSet[i].y3, 
					parameterSet[i].error_2, 
					)
			//}
		}
	}
	
	
	if ( input.scale3.xType !== 'lookup' ){	
		//console.log(input)
		var table={}
		var j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				y : parameterSet[i].x,
				val : parameterSet[i].value3_0,
				}
				j++
			}
		}	

		//console.log(JSON.stringify(input.scale3, null, 2))

		cb = points2parameter({type: input.scale3.xType , table: table, degree: input.scale3.xDegree})
		//console.log(cb)
		input.scale3.m = cb.p
		input.scale3.n = cb.q
	}
	
	if ( input.scale3.type !== 'lookup' ){	

		table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				y : parameterSet[i].y,
				val : parameterSet[i].value3_0,
				}
				j++
			}
		}
		//console.log(input.scale3.xType, table)
		cb = points2parameter( { type: input.scale3.type, table: table, degree: input.scale3.yDegree }) 

		input.scale3.p = cb.p
		input.scale3.q = cb.q
	}


	if ( input.scale3.type === 'lookup' || input.scale3.xType === 'lookup' ){	
		//console.log(parameterSet)
		table={}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				x : parameterSet[i].x,
				y : parameterSet[i].y,
				val : parameterSet[i].value3_0,
				error : parameterSet[i].error
				}
				j++
			}
		}	

		// just save table to object
		input.scale3.table = table
		// set min and max to the min and max value in table, to avoid extrapolating
		// create array of all values
		j=0
		var tempArr = []
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				tempArr[j] = parameterSet[i].value3_0
				j++
			}
		}
		
		//make a regression line over all values and calculate R² 
		
		table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
					table[j]={
					y : parameterSet[i].value3_0,
					val : i,
					}
				j++
			}
		}
		
	}

	//limit min and max to the area, where points had been found
	if ( input.scale3.allowExtrapolation !== true ){
		j=0
		tempArr = []
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				tempArr[j] = parameterSet[i].value3_0
				j++
			}
		}			


		input.scale3.min = Math.max(Math.min(...tempArr),input.scale3.min)
		input.scale3.max = Math.min(Math.max(...tempArr),input.scale3.max)
	}

	if ( isNaN(input.scale3.min) ){
		input.scale3.min = Math.min(...tempArr)
	}
	if ( isNaN(input.scale3.max) ){
		input.scale3.max = Math.max(...tempArr)
	}
	
	
	
}

export function getAutoScale1Parameter(input){
	// scale 3 will be new arranged
	//console.log(input)
	// m, n, p, q and values in table are already scled with user units !!
	var j
	var parameterSet=[]
	var i = 0, cb = []

	// get parameterSet with values, wich will be translated  to xy coordinates of points
	for (var d = 0.1 ; d <= 1.2 ; d = d + 0.05 ){    // bug: infinite loop, if d=0.1

		//console.log(d)
		input.scale1.value = pos2value(input.scale1 , (  window.innerHeight * ( d )) )   // value will be in user units
		input.scale2.value = input.scale2_focus

		parameterSet[i]= {}
		if ( input.verboseLevel > 1 ){
			console.log('first line')
		}


		switch (String(input.nomoName)) {
			case 'uValue' :
				cb[0] = uValueCalculation({
					[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),			// value recalculated to SI-units for physical calculation
					[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
					calcType : input.calcType,
					nomoName : input.nomoName,
					verboseLevel : input.verboseLevel
				})
				break;				
			default :
				console.log('WARNING: This nomoName not defined. Actual type: ' + input.nomoName)
		}

		
		if ( input.verboseLevel > 1 ){
			console.log( cb )
		}


		switch (String(input.calcType)) {
			case 'u00Calculation_floorValue' :
				input.scale3.value = toUserUnits(cb[0].u00 ,input.scale3.unit ) 
				break;
			default :
				console.log('WARNING: This calcType not defined. Actual type: ' + input.calcType )
		}

		//make parameterSet
		parameterSet[i].value_1 = input.scale1.value
		parameterSet[i].value_2 = input.scale2.value
		parameterSet[i].value_3 = input.scale3.value
		parameterSet[i].x = input.scale3.positionX
		i++
	}

	console.log(parameterSet);
	//making 3 intersction points from 3 lines --> calculated center of triangle => x/y   calculate diameter of triangle => error 


	for (i=0; i<parameterSet.length; i++){

		// intersection of #1 and #2
		cb = points2intersection([
		{ x : input.scale1.positionX * window.innerWidth, 
			y : value2pos(input.scale1 , parameterSet[i].value_1) },
		{ x : input.scale2.positionX * window.innerWidth,
			y : value2pos(input.scale2 , parameterSet[i].value_2) },
		{ x : parameterSet[i].x * window.innerWidth,
			y : 0 },
		{ x : parameterSet[i].x * window.innerWidth,
			y : window.innerHeight }
		])

		parameterSet[i].y = cb.y
	}
	

	if( input.verboseLevel > 0 ){
		console.log(parameterSet)
	}


	if( input.verboseLevel > 0 ){
		for (i=0; i<parameterSet.length; i++){
			console.log( 
				i,
				parameterSet[i].value_3, 
				parameterSet[i].x, 
				parameterSet[i].y, 
				)
		}
	}

	// this part is remaining from auto-scale. x-Type should always be constant
	if ( input.scale3.xType === 'constant' ){	
		input.scale3.m = 0
		input.scale3.n = input.scale3.positionX * window.innerWidth
	}

	if ( input.scale3.xType !== 'constant' ){	
		console.log('WARNING!: xType not valid for this scale! was auto-scale wanted?');
	}
	
	
	if ( input.scale3.type !== 'lookup' ){	

		var table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value_3) === 'number' ){
				table[j]={
				y : parameterSet[i].y,
				val : parameterSet[i].value_3,
				}
				j++
			}
		}

		cb = points2parameter( { type: input.scale3.type, table: table, degree: input.scale3.yDegree }) 

		input.scale3.p = cb.p
		input.scale3.q = cb.q
	}



	if ( input.scale3.type === 'lookup' ){	
		//console.log(parameterSet)
		table={}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value_3) === 'number' ){
				table[j]={
				x : parameterSet[i].x,
				y : parameterSet[i].y,
				val : parameterSet[i].value_3,
				error : parameterSet[i].error
				}
				j++
			}
		}	

		// just save table to object
		input.scale3.table = table
		// set min and max to the min and max value in table, to avoid extrapolating
		// create array of all values
		j=0
		var tempArr = []
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value_3) === 'number' ){
				tempArr[j] = parameterSet[i].value_3
				j++
			}
		}
		
		//make a regression line over all values and calculate R² 
		
		table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value_3) === 'number' ){
					table[j]={
					y : parameterSet[i].value_3,
					val : i,
					}
				j++
			}
		}
		
	}

	//limit min and max to the area, where points had been found
	if ( input.scale3.allowExtrapolation !== true ){
		j=0
		tempArr = []
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value_3) === 'number' ){
				tempArr[j] = parameterSet[i].value_3
				j++
			}
		}			


		input.scale3.min = Math.max(Math.min(...tempArr),input.scale3.min)
		input.scale3.max = Math.min(Math.max(...tempArr),input.scale3.max)
	}

	if ( isNaN(input.scale3.min) ){
		input.scale3.min = Math.min(...tempArr)
	}
	if ( isNaN(input.scale3.max) ){
		input.scale3.max = Math.max(...tempArr)
	}	
}


export function getTwinScaleParameter(input){
	// function replaces coordinates and labels of a scale depending on a factor, to create twin manual scales, which are only differing in a factor. May be also possible: fn(x)
	var cb, length,i
//hierweitermachen: Regel für lookup aufstellen!
// regel für polynom aufstellen -> lookup tabelle aufstellen, verschieben, neues polynom erzeugen
	
	if( input.scale2.position === 'twin' ){
		switch ( String (input.scale1.type)){
			case 'linear' :
				input.scale2.p = input.scale1.p / input.factor
				input.scale2.q = input.scale1.q
			break;
			case 'logarithmic' :
				input.scale2.p = input.scale1.p
				input.scale2.q = -1 * input.scale1.p * Math.log10( input.factor ) + input.scale1.q ;
			break;
			case 'lookup' :
				console.log(input.scale1.table);
				length=Object.keys(input.scale1.table).length
				input.scale2.table = []
				for (i=0; i<length; i++){
					input.scale2.table[i] = { 
						val : input.scale1.table[i].val * input.factor,
						error : input.scale1.table[i].error,
						x : input.scale1.table[i].x,
						y : input.scale1.table[i].y
					}
				}
			break;
			default :
				console.log('WARNING: unknown regression type: ' + input.scale1.type );
		}
		switch ( String (input.scale1.type)){
			case 'linear' :
				input.scale2.m = input.scale1.m / input.factor
				input.scale2.n = input.scale1.n
			break;
			case 'logarithmic' :
				input.scale2.m = input.scale1.m
				input.scale2.n = -1 * input.scale1.m * Math.log10( input.factor ) + input.scale1.n ;
			break;
			case 'lookup' :
				console.log(input.scale1.table);
				length=Object.keys(input.scale1.table).length
				input.scale2.table = []
				for (i=0; i<length; i++){
					input.scale2.table[i] = { 
						val : input.scale1.table[i].val * input.factor,
						error : input.scale1.table[i].error,
						x : input.scale1.table[i].x,
						y : input.scale1.table[i].y
					}
				}
			break;
			default :
				console.log('WARNING: unknown regression type: ' + input.scale1.type );
		}
		input.scale2.position = 'auto'
		input.scale2.type = stat.userSetup[input.nomoName][input.name1].type
		input.scale2.xType = stat.userSetup[input.nomoName][input.name1].xType		

		if ( typeof( stat.userSetup[input.nomoName][input.name2].head) === 'undefined' ){
			input.scale2.unit = stat.userSetup[input.nomoName][input.name1].unit
		}

		if ( typeof( stat.userSetup[input.nomoName][input.name2].head) !== 'undefined' ){
			input.scale2.unit = stat.userSetup[input.nomoName][input.name2].unit
		}


		input.scale2.color = stat.userSetup[input.nomoName][input.name2].color
		
		if ( stat.userSetup[input.nomoName][input.name2].head === '' || typeof( stat.userSetup[input.nomoName][input.name2].head) === 'undefined' ){
			input.scale2.head =  stat.userSetup[input.nomoName][input.name1].head
		}; 
		if ( typeof( stat.userSetup[input.nomoName][input.name2].head) !== 'undefined' ){
			input.scale2.head =  stat.userSetup[input.nomoName][input.name2].head
		}
		input.scale2.head =  stat.userSetup[input.nomoName][input.name2].head
		input.scale2.offsetX = stat.userSetup[input.nomoName][input.name2].offsetX
		input.scale2.offsetY = stat.userSetup[input.nomoName][input.name2].offsetY
		input.scale2.min = input.scale1.min * input.factor
		input.scale2.max = input.scale1.max * input.factor
		input.scale2.headSize = input.scale1.headSize
		input.scale2.labelSize = input.scale1.labelSize
		input.scale2.reverse = input.scale1.reverse
		input.scale2.factor = input.factor
		input.scale2.deviders = stat.userSetup[input.nomoName][input.name2].deviders



	}
	return input.scale2
}


function getScaleGridParameter(input){
	//making scale GRid, function not really finished. handle with care !!
	//make array with all x values und calculate mean
	/*
	var i=0, tempArray = [], n, dx, dy
	if ( typeof(stat.userSetup.hotWaterStorage.scaleMinimumTemperature.xSpread) === 'number' ){
		dx = stat.userSetup.hotWaterStorage.scaleMinimumTemperature.xSpread } 
		else { dx = 0 
	}

	if ( typeof(stat.userSetup.hotWaterStorage.scaleMinimumTemperature.ySpread) === 'number' ){	
		dy = stat.userSetup.hotWaterStorage.scaleMinimumTemperature.ySpread } 
		else { dy = 0 
	}

	n = Object.keys(stat.userSetup.hotWaterStorage.scaleMinimumTemperature_1.table).length	
	for (var j = 0; j < n; j++ ){
		tempArray[i] = stat.userSetup.hotWaterStorage.scaleMinimumTemperature_1.table[j].x
		- dx * window.innerWidth
		i++
	}
	n = Object.keys(stat.userSetup.hotWaterStorage.scaleMinimumTemperature_2.table).length	
	for (var j = 0; j < n; j++ ){
		tempArray[i] = stat.userSetup.hotWaterStorage.scaleMinimumTemperature_2.table[j].x
		- 2 * dx * window.innerWidth
		i++
	}
	n = Object.keys(stat.userSetup.hotWaterStorage.scaleMinimumTemperature_3.table).length	
	for (var j = 0; j < n; j++ ){
		tempArray[i] = stat.userSetup.hotWaterStorage.scaleMinimumTemperature_3.table[j].x
		- 3 * dx * window.innerWidth
		i++
	}
	
	
	var i,sum = 0
	for (i = 0; i < tempArray.length; i++ ) {
		sum = sum + tempArray[i]
	}

		stat.userSetup.hotWaterStorage.scaleGrid.dashLength = 0.2

		stat.userSetup.hotWaterStorage.scaleGrid.m = 0
		stat.userSetup.hotWaterStorage.scaleGrid.n = sum / tempArray.length
		stat.userSetup.hotWaterStorage.scaleGrid.p = window.innerHeight / 100
		stat.userSetup.hotWaterStorage.scaleGrid.q = 0
	*/	

	// calculate p,q,m,n by making 10 points similar to autoScale function

	var parameterSet=[]
	var i = 0, cb = [], scale, pos_x, pos_y
	

	// get parameterSet with values, to calculate two lines for each parameterset, wich will be translated  to xy coordinates of points
	for (var d = 0.1; d <= 0.9 ; d = d + 0.05 ){  
		//console.log(d)
		input.scale1.value = pos2value(input.scale1 , (window.innerHeight * d) )
		input.scale2.value = pos2value(input.scale2 , (window.innerHeight * d) )

		parameterSet[i]= {}

		console.log('first line')
		scale = input.scale1
		
		switch (String(scale.xType)) {
			case "inverse" :
				pos_x = scale.m  * ( 1 /  scale.value ) + scale.n
				break;
			case 'linear' :
				pos_x = scale.m  * scale.value + scale.n
				break;
			case "lookup" :
				pos_x = tableLookup( scale.value , scale.table , 'x' )
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
			}
		
		parameterSet[i].P1_x = pos_x
		
		switch (String(scale.type)) {
			case "logarithmic" :
				pos_y = scale.p * Math.log10( scale.value ) + scale.q 
				break;
			case "linear" :
				pos_y = scale.p * scale.value + scale.q 
				break;
			case "lookup" :
				pos_y = tableLookup( scale.value , scale.table , 'y' )
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.type)
			}
				
		parameterSet[i].P1_y = pos_y

		scale = input.scale2
		switch (String(scale.xType)) {
			case "inverse" :
				pos_x = scale.m  * ( 1 /  scale.value ) + scale.n
				break;
			case 'linear' :
				pos_x = scale.m  * scale.value + scale.n
				break;
			case "lookup" :
				pos_x = tableLookup( scale.value , scale.table , 'x' )
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
			}
		
		parameterSet[i].P2_x = pos_x
		
		switch (String(scale.type)) {
			case "logarithmic" :
				pos_y = scale.p * Math.log10( scale.value ) + scale.q 
				break;
			case "linear" :
				pos_y = scale.p * scale.value + scale.q 
				break;
			case "lookup" :
				pos_y = tableLookup( scale.value , scale.table , 'y' )
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.type)
			}
				
		parameterSet[i].P2_y = pos_y

		

		console.log('second line')

		scale = input.scale3
		
		cb = heatStorageCalculation({
			[input.name1] : toSiUnits(input.scale1.value , input.scale1.unit),
			[input.name2] : toSiUnits(input.scale2.value , input.scale2.unit),
			calcType : input.calcType,
			hgName : input.hgName,
			cylName : input.cylName,
			nomoName : input.nomoName,
			userMinTemp : input.userMinTemp,
			verbose : false,
			vverbose : false
		})

console.log(JSON.stringify(cb,null,2))
		parameterSet[i].P3_x = 0.5 * window.innerWidth //just a random value
		
		parameterSet[i].P3_y = value2pos(scale , cb.cylMinTemp) //calculate from cb.cylMinTemp

		parameterSet[i].P4_x = 0.8 * window.innerWidth //just a random value
		
		parameterSet[i].P4_y = parameterSet[i].P3_y //horizontal line per definition
		
console.log(parameterSet)

	for (i=0; i<parameterSet.length; i++){
		if ( typeof(parameterSet[i].value1_0) === 'number' ){
			//points is an array of x and y coordinates [{x: , y: },{},...]
			//the function calculate lines from points 1,2 and 3,4 and returns intersection of these two lines.
			cb = points2intersection([

			{ x : parameterSet[i].P1_x, y : parameterSet[i].P1_y },
			{ x : parameterSet[i].P2_x, y : parameterSet[i].P2_y },
			{ x : parameterSet[i].P3_x, y : parameterSet[i].P3_y },
			{ x : parameterSet[i].P4_x, y : parameterSet[i].P4_y },
			])
			parameterSet[i].x = cb.x
			parameterSet[i].y = cb.y
		}			
	}

	console.log(parameterSet)


	}

// get p,q,m,n from parameterSet!!	
/*	
	if ( input.scale3.xType !== 'lookup' ){	
		//console.log(parameterSet)
		var table={}
		var j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				y : parameterSet[i].x,
				val : parameterSet[i].value3_0,
				}
				j++
			}
		}	
		console.log(input.scale3.xType, table)
		cb = points2parameter(input.scale3.xType, table, 0)
		//console.log(cb)
		input.scale3.m = cb.p
		input.scale3.n = cb.q
	}
	
	if ( input.scale3.type !== 'lookup' ){	

		table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				y : parameterSet[i].y,
				val : parameterSet[i].value3_0,
				}
				j++
			}
		}
		console.log(input.scale3.xType, table)
		cb = points2parameter(input.scale3.type, table, 0)
		input.scale3.p = cb.p
		input.scale3.q = cb.q
	}

	if ( input.scale3.type === 'lookup' || input.scale3.xType === 'lookup' ){	
		//console.log(parameterSet)
		var table={}
		var j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				table[j]={
				x : parameterSet[i].x,
				y : parameterSet[i].y,
				val : parameterSet[i].value3_0,
				error : parameterSet[i].error
				}
				j++
			}
		}	

		// just save table to object
		input.scale3.table = table
		// set min and max to the min and max value in table, to avoid extrapolating
		// create array of all values
		j=0
		var tempArr = []
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
				tempArr[j] = parameterSet[i].value3_0
				j++
			}
		}
		
		//make a regression line over all values and calculate R² 
		
		table = {}
		j = 0
		for (i=0; i<parameterSet.length; i++){
			if( typeof(parameterSet[i].value3_0) === 'number' ){
					table[j]={
					y : parameterSet[i].value3_0,
					val : i,
					}
				j++
			}
		}
		if( typeof(input.scale3.vType) === 'number' ){
			console.log(input.scale3.vType, table)
			cb = points2parameter(input.scale3.vType, table, 0)
			console.log(cb)
			//console.log(Math.min(...tempArr), Math.max(...tempArr))
			input.scale3.min = Math.max(Math.min(...tempArr),input.scale3.min)
			input.scale3.max = Math.min(Math.max(...tempArr),input.scale3.max)
		}

	}
*/
}



export function drawScale(scale,tempsettings){
	
	
	
	if ( scale.type.slice(0,7) === 'polynom' ){ 
		scale.type = scale.type.slice(0,7)
	}
	
	//console.log(scale)
	// this function is new and  should only be used in future.
	
	var scales = [];
	var labels = [];
	var points = [];
	var i, j, y_position, x_position, length, 
	pos_x, pos_y, dashWidth, scaleValues, labelValues
	const centered_dash_factor = 0.707   // a factor to reduce size of dashes, if centered

	if ( typeof(scale.deviders.width) === 'number' ){
		dashWidth = scale.deviders.width }
		else{
		dashWidth = userSettings.dashLength ; // just a factor related to window width
	}
	
	switch (String(scale.deviders.scaling)) {
		case "log" :
			scaleValues = logTesselation(scale.min, scale.max, scale.deviders.scaleSteps);
			labelValues = logTesselation(scale.min, scale.max, scale.deviders.labelSteps);
			break;
		case "lin" :
			scaleValues = linTesselation(scale.min, scale.max, scale.deviders.scaleSteps);
			labelValues = linTesselation(scale.min, scale.max, scale.deviders.labelSteps);
			break;
		case "man" :
			scaleValues = scale.deviders.scaleSteps;
			labelValues = scale.deviders.labelSteps;
			break;
		default : 
			console.log('WARNING: This type of deviderscaling is not defined. Actual type: ' + scale.deviders.scaling + ' using manual')
			scaleValues = scale.deviders.scaleSteps;
			labelValues = scale.deviders.labelSteps;
		}

//console.log(labelValues)

	if ( typeof(scale.xType) !== 'string' ){ scale.xType = 'linear' }
	if ( scale.xType === 'constant' ){ scale.xType = 'linear' }

	//console.log(scaleValues,labelValues)

	if ( scale.position === 'manual' ){ 
		//create p,q,m,n from min, max, height, positionX, positionY
		// then set scale position to "auto"
		// this avoids double programming for manual and auto positioned!
		// manual positioning of curved scale not possible!!
		
		if ( typeof(scale.m) !== 'number' || typeof(scale.n) !== 'number' ){
			var cb
			cb = minMax2parameter(
				scale, 
				scale.min, 
				scale.max
				)

			scale.m = 0
			scale.n = scale.positionX * window.innerWidth
			scale.p = cb.p
			scale.q = cb.q
			}
	
		if ( typeof(scale.m) === 'number' || typeof(scale.n) === 'number' ){ scale.position = 'auto' }

		
		}
	

	if ( scale.position === 'auto' ){
		// giving standard values, if nothing in settings file:
		if ( typeof(scale.deviders.labelOffsetX ) !== 'number' ){ scale.deviders.labelOffsetX = 0 }
		if ( typeof(scale.deviders.labelOffsetY ) !== 'number' ){ scale.deviders.labelOffsetY = 0 }
		
		
		//switch for different scaletypes:
		
		//start-point of centerline
		switch (String(scale.type)) {
			case "logarithmic" :
				pos_y = scale.p * Math.log10( scale.min ) + scale.q 
				break;
			case "linear" :
				pos_y = scale.p * scale.min + scale.q 
				break;
			case "lookup" :
				pos_y = tableLookup( scale.min , scale.table , 'y' )
				break;
			case 'exponent' :
				pos_y = scale.p * Math.pow( scale.min , scale.q)
				break;
			case 'polynom' :
				pos_y = polynom(scale.p, scale.min)
				break;
			case 'quadratic' :
				pos_y = scale.p  * Math.pow( scale.min , 2 ) + scale.q
				break;				
			case 'qubic' :
				pos_y = scale.p  * Math.pow( scale.min , 3 ) + scale.q
				break;				
			case 'sqrt' :
				pos_y = scale.p  * Math.pow( scale.min , 0.5 ) + scale.q
				break;				
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.type)
			}
		
		
		switch (String(scale.xType)) {
			case "inverse" :
				pos_x = scale.m  * ( 1 /  scale.min ) + scale.n
				break;
			case 'linear' :
				pos_x = scale.m  * scale.min + scale.n
				break;
			case "lookup" :
				pos_x = tableLookup( scale.min , scale.table , 'x' )
				break;
			case "inversePower2" :
				pos_x = scale.m  * ( 1 /  Math.pow(scale.min,2) ) + scale.n
				break;
			case "logarithmic" :
				pos_x = scale.m * Math.log10( scale.min ) + scale.n 
				break;
			case 'exponent' :
				pos_x = scale.m * Math.pow( scale.min , scale.n)
				break;
			case 'polynom' :
				pos_x = polynom(scale.m, scale.min)
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
			}
		//console.log(scale.pos_x, scale.pos_y, scale.min, scale.m, scale.n, scale.table)
		
		//point array for centerline values
		//start-point not necessarily a scale point.!!
		
		j=0;		
		points[j] = 0
		j++
		points[j] = 0
		j++

		
		for (const v in scaleValues) {
			switch (String(scale.xType)) {
				case "inverse" :
					points[j] = scale.m  * ( 1 / scaleValues[v] ) + scale.n - pos_x
					break;
				case 'linear' :
					points[j] = scale.m  * scaleValues[v] + scale.n - pos_x
					break;
				case "lookup" :
					points[j] = tableLookup( scaleValues[v] , scale.table , 'x' ) - pos_x
					break;
				case "inversePower2" :
					points[j] = scale.m  * ( 1 /  Math.pow(scaleValues[v],2) ) + scale.n - pos_x
					break;					
				case "logarithmic" :
					points[j] = scale.m * Math.log10( scaleValues[v] ) + scale.n - pos_x 
					break;
				case 'exponent' :
					points[j] = scale.m * Math.pow( scaleValues[v] , scale.n) - pos_x
					break;
				case 'polynom' :
					points[j] = polynom(scale.m, scaleValues[v]) - pos_x
					break;
				default :
					console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
				}
			j++
			
			switch (String(scale.type)) {
				case "logarithmic" :
					points[j] = scale.p * Math.log10( scaleValues[v] ) + scale.q  - pos_y
					break;
				case "linear" :
					points[j] = scale.p * scaleValues[v] + scale.q  - pos_y
					break;
				case "lookup" :
					points[j] = tableLookup( scaleValues[v] , scale.table , 'y' ) - pos_y
					break;
				case 'exponent' :
					points[j] = scale.p * Math.pow( scaleValues[v] , scale.q) - pos_y
					break;
				case 'polynom' :
					points[j] = polynom(scale.p, scaleValues[v]) - pos_y
					break;
				case 'quadratic' :
					points[j] = scale.p  * Math.pow( scaleValues[v] , 2 ) + scale.q - pos_y
					break;				
				case 'qubic' :
					points[j] = scale.p  * Math.pow( scaleValues[v] , 3 ) + scale.q - pos_y
					break;				
				case 'sqrt' :
					points[j] = scale.p  * Math.pow( scaleValues[v] , 0.5 ) + scale.q - pos_y
					break;				
				default :
					console.log('WARNING: This type not defined. Actual type: ' + scale.type)
				}
			j++
		}

		// one additional point for maxlabel!!
		switch (String(scale.xType)) {
			case "inverse" :
				points[j] = scale.m  * ( 1 / scale.max ) + scale.n - pos_x
				break;
			case 'linear' :
				points[j] = scale.m  * scale.max + scale.n - pos_x
				break;
			case "lookup" :
				points[j] = tableLookup( scale.max , scale.table , 'x' ) - pos_x
				break;
			case "inversePower2" :
				points[j] = scale.m  * ( 1 /  Math.pow(scale.max,2) ) + scale.n - pos_x
				break;					
			case "logarithmic" :
				points[j] = scale.m * Math.log10( scale.max ) + scale.n - pos_x 
				break;
			case 'exponent' :
				points[j] = scale.m * Math.pow( scale.max , scale.n) - pos_x
				break;
			case 'polynom' :
				points[j] = polynom(scale.m, scale.max) - pos_x
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
			}
		j++
		
		switch (String(scale.type)) {
			case "logarithmic" :
				points[j] = scale.p * Math.log10( scale.max ) + scale.q  - pos_y
				break;
			case "linear" :
				points[j] = scale.p * scale.max + scale.q  - pos_y
				break;
			case "lookup" :
				points[j] = tableLookup( scale.max , scale.table , 'y' ) - pos_y
				break;
			case 'exponent' :
				points[j] = scale.p * Math.pow( scale.max , scale.q) - pos_y
				break;
			case 'polynom' :
				points[j] = polynom(scale.p, scale.max) - pos_y
				break;
			case 'quadratic' :
				points[j] = scale.p  * Math.pow( scale.max , 2 ) + scale.q - pos_y
				break;				
			case 'qubic' :
				points[j] = scale.p  * Math.pow( scale.max , 3 ) + scale.q - pos_y
				break;				
			case 'sqrt' :
				points[j] = scale.p  * Math.pow( scale.max , 0.5 ) + scale.q - pos_y
				break;				
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.type)
			}


		

		scales[0] = {
			x: pos_x,
			y: pos_y,
			points: points,
			stroke: scale.color,
			strokeWidth: userSettings.strokeWidth * window.innerWidth,
			tension: scale.tension
		};

		//console.log(scales)	
		i=1;


		// making small dashes on all scale positions		
		for (const v in scaleValues) {
			switch (String(scale.type)) {
				case "logarithmic" :
					y_position = scale.p * Math.log10( scaleValues[v] ) + scale.q 
					break;
				case "linear" :
					y_position = scale.p * scaleValues[v] + scale.q 
					break;
				case "lookup" :
					y_position = tableLookup( scaleValues[v] , scale.table , 'y' )
					break;
				case 'exponent' :
					y_position = scale.p * Math.pow( scaleValues[v] , scale.q)
					break;
				case 'polynom' :
					y_position = polynom(scale.p, scaleValues[v])
					break;
				case 'quadratic' :
					y_position = scale.p  * Math.pow( scaleValues[v] , 2 ) + scale.q
					break;				
				case 'qubic' :
					y_position = scale.p  * Math.pow( scaleValues[v] , 3 ) + scale.q
					break;				
				case 'sqrt' :
					y_position = scale.p  * Math.pow( scaleValues[v] , 0.5 ) + scale.q
					break;				
				default :
					console.log('WARNING: This type not defined. Actual type: ' + scale.type)
				}
			
			switch ( scale.deviders.position ){
			case 'left':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / scaleValues[v] ) + scale.n - window.innerWidth * dashWidth * 0.5
						break;
					case 'linear' :
						x_position = scale.m  * scaleValues[v] + scale.n - window.innerWidth * dashWidth * 0.5
						break;
					case 'lookup' :
						x_position = tableLookup( scaleValues[v] , scale.table , 'x' ) - window.innerWidth * dashWidth * 0.5
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(scaleValues[v],2) ) + scale.n - window.innerWidth * dashWidth * 0.5
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( scaleValues[v] ) + scale.n - window.innerWidth * dashWidth * 0.5
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( scaleValues[v] , scale.n) - window.innerWidth * dashWidth * 0.5
						break;
					case 'polynom' :
						x_position = polynom(scale.m, scaleValues[v]) - window.innerWidth * dashWidth * 0.5
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 0.5
			break;
			
			case 'right':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / scaleValues[v] ) + scale.n 
						break;
					case 'linear' :
						x_position = scale.m  * scaleValues[v] + scale.n
						break;
					case 'lookup' :
						x_position = tableLookup( scaleValues[v] , scale.table , 'x' )
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(scaleValues[v],2) ) + scale.n
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( scaleValues[v] ) + scale.n
						break;
					case 'polynom' :
						x_position = polynom(scale.m, scaleValues[v])
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 0.5
			break;
			
			
			default: 
				
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / scaleValues[v] ) + scale.n  - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					case 'linear' :
						x_position = scale.m  * scaleValues[v] + scale.n  - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					case 'lookup' :
						x_position = tableLookup( scaleValues[v] , scale.table , 'x' ) - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(scaleValues[v],2) ) + scale.n - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( scaleValues[v] ) + scale.n - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( scaleValues[v] , scale.n) - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					case 'polynom' :
						x_position = polynom(scale.m, scaleValues[v]) - window.innerWidth * dashWidth * 0.5 * centered_dash_factor
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * centered_dash_factor
			}						
			
			
			scales[i] = {
				value: scaleValues[v],
				x: x_position,
				y: y_position,
				points: [0, 0, length, 0],
				stroke: scale.color,
				strokeWidth: userSettings.strokeWidth * window.innerWidth * 0.5
			};
			i++;			
		}
		
		//big dashes
		for (const v in labelValues) {
			
			switch (String(scale.type)) {
				case "logarithmic" :
					y_position = scale.p * Math.log10( labelValues[v] ) + scale.q 
					break;
				case "linear" :
					y_position = scale.p * labelValues[v] + scale.q 
					break;
				case "lookup" :
					y_position = tableLookup( labelValues[v] , scale.table , 'y' ) 
					break;
				case 'exponent' :
					y_position = scale.p * Math.pow( labelValues[v] , scale.q)
					break;
				case 'polynom' :
					y_position = polynom(scale.p, labelValues[v])
					break;
				case 'quadratic' :
					y_position = scale.p  * Math.pow( labelValues[v] , 2 ) + scale.q
					break;				
				case 'qubic' :
					y_position = scale.p  * Math.pow( labelValues[v] , 3 ) + scale.q
					break;				
				case 'sqrt' :
					y_position = scale.p  * Math.pow( labelValues[v] , 0.5 ) + scale.q
					break;				
				default :
					console.log('WARNING: This type not defined. Actual type: ' + scale.type)
				}

			switch ( scale.deviders.position ){
			case 'left':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n - window.innerWidth * dashWidth * 1
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n - window.innerWidth * dashWidth * 1
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' ) - window.innerWidth * dashWidth * 1
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n - window.innerWidth * dashWidth * 1
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n - window.innerWidth * dashWidth * 1
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( labelValues[v] , scale.n) - window.innerWidth * dashWidth * 1
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v]) - window.innerWidth * dashWidth * 1
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 1
			break;
			
			case 'right':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n 
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' )
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v])
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 1
			break;
			
			
			default: 

				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n  - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n  - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' ) - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( labelValues[v] , scale.n) - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v]) - window.innerWidth * dashWidth * 1 * centered_dash_factor
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 2 * centered_dash_factor
			}						
			




			scales[i] = {
				value: scaleValues[v],
				x: x_position,
				y: y_position,
				points: [0, 0, length, 0],
				stroke: scale.color,
				strokeWidth: userSettings.strokeWidth * window.innerWidth
			};
			i++;
		}		
		
		if ( typeof(scale.offsetX) !== 'number' ){
			scale.offsetX = 0
		}		
		
		//main headline , not dependent of right/left
		labels[0] = {
			x: pos_x,
			y: window.innerHeight * userSettings.headPositionY,
			position: "center",
			text: scale.head + " \n [" + scale.unit + "]" ,
			fontSize: window.innerWidth * scale.headSize,
			offsetX: -1 * window.innerWidth * scale.offsetX
		};


		// making labels
		i = 1;
		for (const v in labelValues) {
			
			switch (String(scale.type)) {
				case "logarithmic" :
					y_position = scale.p * Math.log10( labelValues[v] ) + scale.q 
					break;
				case "linear" :
					y_position = scale.p * labelValues[v] + scale.q 
					break;
				case "lookup" :
					y_position = tableLookup( labelValues[v] , scale.table , 'y' ) 
					break;
				case 'exponent' :
					y_position = scale.p * Math.pow( labelValues[v] , scale.q)
					break;
				case 'polynom' :
					y_position = polynom(scale.p, labelValues[v])
					break;
				case 'quadratic' :
					y_position = scale.p  * Math.pow( labelValues[v] , 2 ) + scale.q
					break;				
				case 'qubic' :
					y_position = scale.p  * Math.pow( labelValues[v] , 3 ) + scale.q
					break;				
				case 'sqrt' :
					y_position = scale.p  * Math.pow( labelValues[v] , 0.5 ) + scale.q
					break;				
				default :
					console.log('WARNING: This type not defined. Actual type: ' + scale.type)
				}

			switch ( scale.deviders.position ){
			case 'left':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n - window.innerWidth * dashWidth
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n - window.innerWidth * dashWidth
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' ) - window.innerWidth * dashWidth
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n - window.innerWidth * dashWidth
						break;					
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n - window.innerWidth * dashWidth
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( labelValues[v] , scale.n) - window.innerWidth * dashWidth
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v]) - window.innerWidth * dashWidth 
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 1
				var offset
				if ( labelValues[v] >= 1 ){
					offset = Math.trunc(Math.log10( labelValues[v] )) * scale.labelSize * 600
				} else {
					offset = + 1.5 * scale.labelSize * 600
				}
				x_position = x_position - offset

			break;
			case 'right':
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' ) + window.innerWidth * dashWidth * 1
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v]) + window.innerWidth * dashWidth * 1
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 1
			break;
			default: 
				switch (String(scale.xType)) {
					case "inverse" :
						x_position = scale.m  * ( 1 / labelValues[v] ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'linear' :
						x_position = scale.m  * labelValues[v] + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'lookup' :
						x_position = tableLookup( labelValues[v] , scale.table , 'x' ) + window.innerWidth * dashWidth * 1
						break;
					case "inversePower2" :
						x_position = scale.m  * ( 1 /  Math.pow(labelValues[v],2) ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case "logarithmic" :
						x_position = scale.m * Math.log10( labelValues[v] ) + scale.n + window.innerWidth * dashWidth * 1
						break;
					case 'exponent' :
						x_position = scale.m * Math.pow( labelValues[v] , scale.n) + window.innerWidth * dashWidth * 1
						break;
					case 'polynom' :
						x_position = polynom(scale.m, labelValues[v]) - window.innerWidth * dashWidth * 1
						break;
					default :
						console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
					}
				length = window.innerWidth * dashWidth * 2
			}	

			if ( isNaN( scale.deviders.labelOffsetX * window.innerWidth) ){
				scale.deviders.labelOffsetX = 0
			}
				
			if ( isNaN( scale.deviders.labelOffsetY * window.innerWidth) ){
				scale.deviders.labelOffsetY = 0
			}

				
			labels[i] = {
				x: x_position,
				y: y_position,
				text: niceRounding(labelValues[v]),    //truncate to correct size of places after comma
				fontSize: window.innerWidth * scale.labelSize,
				offsetX: -1 * scale.deviders.labelOffsetX * window.innerWidth,
				offsetY: window.innerWidth * scale.labelSize - scale.deviders.labelOffsetY * window.innerHeight,
				rotation: scale.deviders.labelRotation
				
			};
			i++;
		}		
	}
	return { scales, labels };
	}


function drawLinScale(scaleName, nomoName, tempSettings){
	var scale = userSetup[nomoName][scaleName]
	var cb = drawScale(scale, tempSettings)
	var scales = cb.scales
	var labels = cb.labels
	return { scales, labels };

}


function drawLogScale(scaleName, nomoName, tempSettings){
	var scale = userSetup[nomoName][scaleName]
	var cb = drawScale(scale, tempSettings)
	var scales = cb.scales
	var labels = cb.labels
  return { scales, labels };
}


function drawTableScale(scaleName, nomoName, tempSettings){
	var scale = userSetup[nomoName][scaleName]
	var cb = drawScale(scale, tempSettings)
	var scales = cb.scales
	var labels = cb.labels
  return { scales, labels };
}


//export { drawScale, drawLinScale, drawLogScale, drawTableScale, tableLookup, logTesselation, linTesselation, getAutoScaleParameter, getTwinScaleParameter};
