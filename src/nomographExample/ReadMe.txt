

	nomograph_name:{
    scale_name: {
      type: "sqrt",																				linear | sqrt | logarithmic,   if position=auto => lookup polynom
			yDegree : 5,																				obligatory parameter for polynom regression 
			xType: "constant",																	constant, linear, sqrt, qubic, logarithmic,   if position=auto => lookup polynom
			xDegree : 5,																				obligatory parameter for polynom regression 
      position: "manual",																	manual | auto | twin
      unit: "m",																					
      positionX: 0.2, 																		only needed if position is manual!
      positionY: 0.2, 																		only needed if position is manual!
      height: 0.8,																				only needed if position is manual!
			width: 0,																						influences the manual scales in x-direction. used to compensate bent rulers      
      color: "black",
      head: "P/A relative perimeter",
      offsetX: -0.15,																			moves the headline in x -direction
      headSize: userSettings.headSize,										gives the font-size of the header
      labelSize: userSettings.labelSize,									gives the font-size of labels
      min: 0.2,																						minimum value on scale
      max: 0.9,																						maximum value on scale
      deviders: {
        scaleSteps: [0.05],																an array of numbers to adjust 
        labelSteps: [0.1],																an array of numbers to adjust labels
        scaling: "lin",																		lin | log | man 
        position: "left"																	left | right | center
        labelOffsetX: -0.02,															moves the labels in X
        labelOffsetY: 0,																	moves the labales in Y
        labelRotation: 30,																rotates the label text
        width																							gives the width of scale dashes

      },
      reverse: true																				true | false
    },

