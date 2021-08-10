//last change: 20210508_21:00

/*
known keywords for all scales:
values can be given as 'string', numbers, or known variables.


type: 'logarithmic',			logarithmic | linear | lookup  of scale y-coordinate
xType: 'lookup',				logarithmic | linear | lookup  of scale x-coordinate
position: 'manual',				manual | auto
unit: 'l/s',					choosable unit for scale ... not yet correct working
positionX: 0.7,					position relative to screen width. Only if "position : manual"
positionY: 0.15, 				position relative to screen height. Only if "position : manual"
height: 0.8,					height relative to screen height. Only if "position : manual"
color: "black",					color of scale. can be omitted.
head: "q \n [l/s]",				headline over scales
offsetX: -0.05,					Horizontal offset of headline 
headSize: userSettings.headSize,		font-size of headline
labelSize: userSettings.labelSize,		font-size of labels
min: 0.01,						minimum displayed value
max: 150,						maximum displayed value
deviders: {
	scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	labelSteps: [1],
	scaling: 'log',				log | lin | man  ... for logarithmic, linear or manual scales.
	position: 'left'			left | right | center ... can be omitted, if centered dashes are wanted.
},
reverse: true					true | false ... if true, then scaling is from bottom to top ordered.



explanation scalesteps and labelsteps:
- scalesteps affects the small dashes , labelsteps the big, labelled dashes.
- in sqare brackets is a comma separated list given.
- log: each value is logarithmic projected.                   e.g.  1  -->   1, 10, 100, 1000 ... 
- lin: each scale, which is divisible by the number is shown. e.g.  10 -->  10, 20, 30, 40, 50, ....
- man: only the given values are shown.                       e.g.  2  -->  2


BUG: if scaling = lin, then steps smaller 1 are not working...
  reproducable in radiator calculation oversizeFactor
*/

var userSettings = {
  renderWidth: 0,
  renderHeight: 0,
  headSize: 0.015,
  labelSize: 0.015,
  headPositionY: 0.03,
  strokeWidth: 0.001,
  dashLength: 0.025,
};

var userInput = {
  unitConverter: {
    temperature: 20,
    brineType: "ethylenGlycol",
    brineRatio: 0.0,
    rulerPositions: {
      flowRate: 0.0002, //this is value is in SI unit
      weight: 0.5,
      pressure: 150,
      length: 0.085,
    },
    flowRate: {
      "l/s": true,
      "l/min": true,
      "l/h": true,
      "m³/h": true,
    },

    weight: {
      kg: true,
      lbs: true,
      g: true,
      daN: true,
      t: false,
    },
    pressure: {
      "N/m²": true,
      Pa: true,
      bar: true,
      psi: true,
    },
    length: {
      mm: true,
      m: true,
      ft: true,
      in: true,
    },
  },

  massFlowCalculation: {
    brineType: "ethylenGlycol",
    brineRatio: 0.0,
    temperature: 55, // for calculation of cp and rho
    deltaTemp: 35,
    power: 20000,
  },

  pipeCalculation: {
    brineType: "ethylenGlycol",
    brineRatio: 0.0,
    flowRate: 0.001,
    pipeDiameter: 0.032,
    pipeLength: 33,
    temperature: 55,
    deltaTemp: 5,
    pressureDrop: 60, // auto calculated
    velocity: 2, // auto calculated
    roughness: 0.05,
  },

  pipeCalculation2: {
    pipeDiameter: 0.012,
    pipeLength: 100,
  },

  radiatorCalculation: {
    //add factors f2, f3, f4 according to DHDG V2020-Draft-200311.pdf page 158 ff.
    roomTemp: 20,
    inflowTemp: 60,
    outflowTemp: 40,
    powerFactor: 1, //auto calculated
    oversizeFactor: 1, //auto calculated
    radiator: "radiator_1",
    f_2: 1,
    f_3: 1,
    f_4: 1,
  },

  hotWaterStorage: {
    source1: "heatGenerator1",
    source2: "heatGenerator2",
    source3: "heatGenerator3",
    cylinder: "storageCylinder1",
    userTemp: 40,
    userFlowRate: 0.0003,
    //userMinTemp: 35,
    userDrawOff: 0.15,
    coldWaterTemp: 10,
    timestepMax: 60,
    timestepAuto: true,
    timestepConfinement: 100, // how fast the timestep should be refined. higher value is faster, but worse result
    roomTemp: 20,
  },

  hotWaterStorage3: {
    source: "heatGenerator4", //from this generator, the on / off values  etc. will be taken.
    cylinder: "storageCylinder2",
    userTemp: 40,
    userFlowRate: 0.0003,

    coldWaterTemp: 10,
    timestepMax: 60,
    timestepAuto: true,
    timestepConfinement: 100, // how fast the timestep should be refined. higher value is faster, but worse result
    roomTemp: 20,
  },

  hotWaterStorage4: {
    // Reheat time Nomograph
    source: "heatGenerator5", //from this generator, the on / off values  etc. will be taken.
    cylinder: "storageCylinder5",
    userTemp: 40,
    userVolume: 0.15, // the user draw off .. renamed to reduce confusion with variable names!
    userFlowRate: 0.0003,
    coldWaterTemp: 10,

    timestepMax: 60,
    timestepAuto: true,
    timestepConfinement: 100, // how fast the timestep should be refined. higher value is faster, but worse result
    roomTemp: 20,
  },

  expansionVessel1: {
    systemVolume: 0.34,
    systemSafetyPressure: 3e5,
    systemPrechargePressure: 0.5e5,
    brineType: "ethylenGlycol",
    brineRatio: 0,
    maxTemp: 80,
    roomTemp: 0,
  },
  expansionVessel2: {
    systemVolume: 0.3,
    expansionVesselVolume: 0.019,
    systemSafetyPressure: 3e5,
    systemPrechargePressure: 1e5,
    brineType: "ethylenGlycol",
    brineRatio: 0,
    roomTemp: 10,
  },

  floorHeating1: {
    systemType: "B",
    pipeDistance: 0.1, //in BS-EN-1264 named: T
    pipeDiameter: 0.015, //must be within 0.014 ..0.022
    mwt: 45, //mean water temperature
    roomTemp: 20,
    R_lambdaB: 0.04, // resistance of floor covering K/W
    s_E: 0.001, //thickness of screed or covering above pipe
    lambda_E: 0.15, //is the heat conductivity of the screed, in W/(m ⋅ K);
    s_WL: 45e-6, // is the thickness of the heat diffusion device;
    lambda_WL: 200, // is the heat conductivity of the heat diffusion device;
    width_WL: 0.15, // width of heat diffusion device, in BS-EN-1264 named: L
  },

  floorHeating2: {
    pipeDistance: 0.08,
    pipeDiameter: 0.01, //not used yet.
    floorArea: 45,
  },

  floorHeating3: {
    brineType: "ethylenGlycol",
    brineRatio: 0.0,
    //power: 350,  //not used yet
    flowRate: 1 / 60000, //for ruler  ... /60000 to easier input l/min instead of m³/s
    pipeDiameter: 0.032,
    pipeLength: 2, //for ruler
    temperature: 55,
    deltaTemp: 5,
    roughness: 0.05,
  },

  floorHeating4: {
    systemType: "B",
    pipeDistance: 0.15, //for Ruler
    pipeDiameter: 0.015, //must be within 0.014 ..0.022
    mwt: 45, //for Ruler mean water temperature
    roomTemp: 20,
    R_lambdaB: 0.1, // resistance of floor covering K/W
    s_E: 0.018, //thickness of screed or covering above pipe
    lambda_E: 0.15, //is the heat conductivity of the screed, in W/(m ⋅ K);
    s_WL: 0.0005, // is the thickness of the heat diffusion device;
    lambda_WL: 200, // is the heat conductivity of the heat diffusion device;
    width_WL: 0.15, // width of heat diffusion device, in BS-EN-1264 named: L
  },

  uValue1: {
    wallThickness: 0.1,
    relativePerimeter: 0.3,
    lambda: 0.035,
    ownEquation5: false, //if true, then parameter from design guide are used. If false, then own parameter are used
    table321: false, //if false, then Resistance of insulation is added as  R = t / my   with 1/u_total = SUM ( 1 /u_i )
  },
};

var userSetup = {
  radiators: {
    radiator1: {
      nominalPower: 2000,
      nominalTemp: 50,
      exponent: 1.3,
    },
  },

  heatGenerators: {
    // if hgTemp <= hgNomTemp then no loss in power
    heatGenerator1: {
      hgNomPower: 6000,
      hgNomTemp: userInput.hotWaterStorage.coldWaterTemp, // at which maximal temperature has heat generator its nominal power.
      // According to british standard, this is the cold-Water Temperature
      // In the case of loading storage systems, set it to hgNomTemp = hgTemp
      hgOffTemp: 60, // temperature , where the heater is switched on
      hgOnTemp: 59, // temperature , where the heater is switched on
      hgTemp: 65, // temperature where power is zero
      hgConnectionLength: 2,
      hgConnectionDiameter: 0.025,
      hgConnectionResistance: 0.035, // [W/mK]
    },

    heatGenerator2: {
      hgNomPower: 10000,
      hgNomTemp: userInput.hotWaterStorage.coldWaterTemp,
      hgOffTemp: 65,
      hgOnTemp: 60,
      hgTemp: 65,
    },
    heatGenerator3: {
      hgNomPower: 5000,
      hgNomTemp: userInput.hotWaterStorage.coldWaterTemp,
      hgOffTemp: 60,
      hgOnTemp: 59,
      hgTemp: 65,
    },
    heatGenerator4: {
      hgNomPower: 12000,
      hgNomTemp: 65,
      hgOffTemp: 60,
      hgOnTemp: 59,
      hgTemp: 65,
    },
    heatGenerator5: {
      hgNomPower: 9000,
      hgNomTemp: 10,
      hgOffTemp: 60,
      hgOnTemp: 59,
      hgTemp: 65,
    },
  },

  storageCylinders: {
    storageCylinder1: {
      //cylLossResistance : 0.693,	// commonly R= U_HG * A_HG, can be estimated with formula
      cylRho: 1000, // later calculated with brine.js
      cylTemp: 60,
      cylVolume: 0.5,
      brineType: "ethylenglycol",
      brineRatio: 0,
    },
    storageCylinder2: {
      //cylLossResistance : 0.693,	// commonly R= U_HG * A_HG, can be estimated with formula
      cylRho: 1000, // later calculated with brine.js
      cylTemp: 60,
      cylVolume: 0.4,
      brineType: "ethylenglycol",
      brineRatio: 0,
    },
    storageCylinder5: {
      //cylLossResistance : 0.693,	// commonly R= U_HG * A_HG, can be estimated with formula
      cylRho: 1000, // later calculated with brine.js
      cylTemp: 60,
      cylVolume: 0.3,
      brineType: "ethylenglycol",
      brineRatio: 0,
    },
  },

  units: {
    flowRate: "l/s",
    volumeFlow: "l/s",
    pipeDiameter: "mm",
    temperature: "C",
    speed: "m/s",
    pressure: "Pa",
    power: "kW",
  },

  unitConverter: {
    flowRate: {
      type: "logarithmic", // one setting for all scales on one converter page!
      scaling: "log",
      paddingX: 0.2,
      paddingY: 0.15,
      reverse: true,
      siMin: 0.0001, // min ans max value in SI units!!
      siMax: 0.005,
      offsetX: -0.02,
      "l/s": {
        unit: "l/s",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      "l/min": {
        unit: "l/min",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      "l/h": {
        unit: "l/h",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      "m³/h": {
        unit: "m³/h",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
    },
    weight: {
      type: "logarithmic", // one setting for all scales on one converter page!
      scaling: "log",
      paddingX: 0.2,
      paddingY: 0.15,
      reverse: true,
      siMin: 0.001, // min ans max value in SI units!!
      siMax: 2,
      offsetX: -0.01,
      kg: {
        unit: "kg",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      lbs: {
        unit: "lbs",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      g: {
        unit: "g",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      daN: {
        unit: "daN",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      t: {
        unit: "t",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
    },
    pressure: {
      type: "logarithmic", // one setting for all scales on one converter page!
      scaling: "log",
      paddingX: 0.2,
      paddingY: 0.15,
      reverse: true,
      siMin: 100, // min ans max value in SI units!!
      siMax: 500,
      offsetX: -0.02,
      "N/m²": {
        unit: "N/m²",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9],
          labelSteps: [1, 2, 3, 4, 5],
          position: "center",
          scaling: "log",
        },
      },
      Pa: {
        unit: "Pa",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9],
          labelSteps: [1, 2, 3, 4, 5],
          position: "center",
          scaling: "log",
        },
      },
      bar: {
        unit: "bar",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9],
          labelSteps: [1, 2, 3, 4, 5],
          position: "center",
          scaling: "log",
        },
      },
      psi: {
        unit: "psi",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9],
          labelSteps: [1, 2, 3, 4, 5],
          position: "center",
          scaling: "log",
        },
      },
    },
    length: {
      type: "logarithmic", // one setting for all scales on one converter page!
      scaling: "log",
      paddingX: 0.2,
      paddingY: 0.15,
      reverse: true,
      siMin: 0.01, // min ans max value in SI units!!
      siMax: 0.2,
      offsetX: -0.02,
      mm: {
        unit: "mm",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      m: {
        unit: "m",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      ft: {
        unit: "ft",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
      in: {
        unit: "in",
        color: "black",
        headSize: userSettings.headSize,
        labelSize: userSettings.labelSize,
        deviders: {
          scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labelSteps: [1],
          position: "center",
          scaling: "log",
        },
      },
    },
  },

  massFlowCalculation: {
    scalePower: {
      type: "logarithmic",
      xType: "linear",
      position: "manual",
      unit: "kW",
      positionX: 0.2,
      positionY: 0.2,
      height: 0.75,
      width: 0,
      color: "black",
      head: "Power",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 50,
      deviders: {
        scaleSteps: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22,
          23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41,
          42, 43, 44, 45, 46, 47, 48, 49,
        ],
        labelSteps: [1, 5, 10, 20, 30, 40, 50],
        scaling: "log",
        position: "center",
      },
      reverse: true,
    },

    scaleVolumeFlow: {
      type: "logarithmic",
      xType: "linear",
      position: "auto",
      unit: "l/min",
      color: "black",
      head: "Flowrate",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 40,
      deviders: {
        scaleSteps: [
          2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23,
          24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        ],
        labelSteps: [1, 5, 10, 20, 30, 40],
        scaling: "log",
        position: "center",
      },
    },

    scaleTemperature: {
      type: "logarithmic",
      xType: "linear",
      position: "manual",
      unit: "°C",
      positionX: 0.8,
      positionY: 0.12,
      height: 0.75,
      width: 0,
      color: "black",
      head: "\u0394 T",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 40,
      deviders: {
        scaleSteps: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22,
          23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41,
          42, 43, 44, 45, 46, 47, 48, 49,
        ],
        labelSteps: [1, 5, 10, 20, 30, 40],
        scaling: "log",
        position: "center",
      },
      reverse: false,
    },
  },

  pipeCalculation: {
    safeArea: {
      minPressure: 70,
      maxPressure: 500,
      minVelocity: 0.5,
      maxVelocity: 1.5,
      minDiameter: 30,
      maxDiameter: 80,
    },

    scalePressureDrop: {
      type: "lookup", //untested
      xType: "lookup", //untested
      position: "auto",
      unit: "kPa", //  auto | manual
      color: "black", //colour
      head:
        "Power @" +
        userInput.pipeCalculation.deltaTemp +
        "°C \n @ " +
        userInput.pipeCalculation.pipeLength +
        " m",
      offsetX: 0.2,
      headSize: userSettings.headSize, // as reference to userSettings
      labelSize: userSettings.labelSize,
      min: 0.5, //minimum labeled value
      max: 35, //maximum labeled value
      deviders: {
        scaleSteps: [
          1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9,
        ],
        labelSteps: [1, 2, 3, 4, 5],
        scaling: "log", //  man | lin | log				--> log (array) is a repeating array between 1 and 9, lin (number) is equal spaced
        position: "right",
      },
    },
    scalePressureDrop2: {
      position: "twin",
      color: "black",
      head: "Power @" + userInput.pipeCalculation.deltaTemp + "°C \n @  1 m",
      offsetX: 0,
      factor: 1 / userInput.pipeCalculation.pipeLength,
      deviders: {
        scaleSteps: [
          1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9,
        ],
        labelSteps: [1, 2, 3, 4, 5],
        scaling: "log",
        position: "left",
      },
    },

    scaleVelocity: {
      type: "logarithmic",
      xType: "linear",
      position: "auto",
      unit: "m/s",
      color: "black",
      head: "velocity",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.1,
      max: 3,
      deviders: {
        scaleSteps: [1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "right",
      },
    },

    scaleFlowRate: {
      type: "logarithmic",
      position: "manual",
      unit: "l/min",
      positionX: 0.7, //only needed if position is manual!
      positionY: 0.15, //only needed if position is manual!
      height: 0.8, //only needed if position is manual!
      color: "black",
      head: "flowrate",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.6,
      max: 9000,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1],
        scaling: "log",
        position: "left",
      },
      reverse: true,
    },

    // power scale is made as fork of volume Flow, so most parameters are copied.
    scalePower: {
      position: "twin",
      color: "black",
      unit: "kW",
      head: "Power @" + userInput.pipeCalculation.deltaTemp + "°C",
      offsetX: 0,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1],
        scaling: "log",
        position: "right",
      },
    },

    scaleDiameter: {
      type: "logarithmic",
      position: "manual",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "green",
      head: "diameter",
      unit: "mm",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 10,
      max: 200,
      deviders: {
        scaleSteps: [10, 12.5, 25, 32],
        labelSteps: [10, 25, 50],
        scaling: "man",
      },
      reverse: true,
    },
  },

  pipeCalculation2: {
    scaleDiameter: {
      type: "logarithmic",
      position: "manual",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "diameter",
      unit: "mm",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 6,
      max: 100,
      deviders: {
        scaleSteps: [],
        labelSteps: [6, 8, 10, 12, 25, 50, 80, 100, 125],
        scaling: "man",
        position: "center",
      },
      reverse: true,
    },
    scalePipeLength: {
      type: "logarithmic",
      position: "manual",
      positionX: 0.2,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "length",
      unit: "m",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 200,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "center",
      },
      reverse: true,
    },

    scaleVolume: {
      type: "logarithmic",
      xType: "constant",
      position: "auto",
      unit: "l",
      color: "black",
      head: "volume",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.03,
      max: 2000,
      allowExtrapolation: true, // set this value to true, to draw extrapolate scale outside of table values!!

      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "center",
      },
    },
  },

  radiatorCalculation: {
    scaleInflow: {
      type: "linear",
      position: "manual",
      positionX: 0.15,
      positionY: 0.15,
      height: 0.8,
      color: "red",
      head: "T_in [°C]",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 90,
      deviders: {
        scaleSteps: [5],
        labelSteps: [10],
        scaling: "lin",
      },
      reverse: true,
    },

    scaleOutflow: {
      type: "linear",
      position: "manual",
      positionX: 0.85,
      positionY: 0.15,
      height: 0.8,
      color: "blue",
      head: "T_out [°C]",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 90,
      deviders: {
        scaleSteps: [2],
        labelSteps: [10],
        scaling: "lin",
      },
      reverse: true,
    },

    // auto calculated scales...

    scaleMeanTemp: {
      type: "linear",
      position: "auto",
      color: "black",
      width: 0.001,
      head: "\u0394 T [°C]",
      offsetX: -0.08,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 10,
      max: 70,
      deviders: {
        scaleSteps: [2],
        labelSteps: [10],
        position: "left",
        scaling: "lin",
      },
      reverse: true,
    },

    scaleOversizeFactor: {
      type: "lookup",
      position: "auto",
      color: "black",
      width: 0.001,
      head: "OF",
      offsetX: +0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.7,
      max: 4,
      deviders: {
        // BUG: if scaling = lin, then steps smaller 1 are not working...
        scaleSteps: [
          0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.1, 1.2, 1.3, 1.4, 1.5,
          1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.5, 4, 4.5, 5, 5.5,
        ],
        labelSteps: [0.7, 0.8, 0.9, 1, 1.5, 2, 3, 4, 5],
        position: "right",
        scaling: "man",
      },
      reverse: true,
    },
  },

  hotWaterStorage: {
    scaleStorageVolume: {
      type: "logarithmic",
      position: "manual",
      unit: "l",
      positionX: 0.15,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "cyl. Volume",
      offsetX: -0.07,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 100,
      max: 1000,
      deviders: {
        scaleSteps: [1, 1.2, 1.5, 2, 2.2, 2.5, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 3, 5],
        scaling: "log",
        position: "center",
      },
      reverse: true,
    },

    scaleUsageVolume: {
      type: "logarithmic",
      xType: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.35,
      positionY: 0.3,
      height: 0.5,
      color: "black",
      head: "single \n draw-off",
      offsetX: +0.01,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 50,
      max: 700,
      deviders: {
        scaleSteps: [1, 1.2, 1.5, 2, 2.2, 2.5, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 3, 5],
        scaling: "log",
        position: "right",
      },
      reverse: true,
    },

    scaleUsageTime: {
      position: "auto",
      unit: "min",
      color: "black",
      head: "usage \n time",
      offsetX: -0.07,
      min: 5,
      max: 50,
      deviders: {
        scaleSteps: [1, 1.2, 1.5, 2, 2.2, 2.5, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 3, 5],
        scaling: "log",
        position: "left",
      },
    },

    scaleMinimumTemperature: {
      type: "polynom", //new regression: polynom
      yDegree: 5, //obligatory parameter for polynom regression
      xType: "constant",
      position: "auto",
      unit: "°C",
      positionX: 0.7,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: {
        1: "T 1",
        2: "T 2",
        3: "T 3",
      },
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: {
        1: 35,
        2: 30,
        3: 30,
      },
      max: {
        1: 56,
        2: 55,
        3: 54,
      },
      deviders: {
        scaleSteps: [1],
        labelSteps: [2],
        scaling: "lin",
        position: "center",
      },
      xSpread: 0.08,
    },

    scaleGrid: {
      type: "linear",
      position: "auto",
      positionX: 0.15,
      positionY: 0.15,
      height: 0.8,
      width: 0.2,
      color: "blue",
      min: 20,
      max: 80,
      deviders: {
        scaleSteps: [],
        labelSteps: [],
        scaling: "lin",
        position: "right",
      },
      reverse: true,
    },
  },

  hotWaterStorage3: {
    scaleHgPower: {
      type: "linear",
      //xType: "linear",
      position: "manual",
      unit: "kW",
      positionX: 0.15,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "Power of heatgenerator",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 5,
      max: 24,
      deviders: {
        scaleSteps: [1],
        labelSteps: [1, 6],
        scaling: "lin",
        position: "center",
      },
      reverse: false,
    },

    scaleStorageVolume: {
      type: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.75,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "cyl. Volume",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 100,
      max: 800,
      deviders: {
        scaleSteps: [10],
        labelSteps: [50],
        scaling: "lin",

        /*
        scaleSteps: [100,110,120,130,140,150,160,170,188,190,
					200,210,220,230,240,250,260,270,280,290,
					300,310,320,330,340,350,360,370,380,390,
					400,410,420,430,440,450,460,470,480,490],
        labelSteps: [100,150,200,250,300,350,400,450,500,550,600,650,700,750,800],
        scaling: "man",
        */
        position: "left",
      },
      reverse: true,
    },

    scaleUsageVolume: {
      type: "polynom", //new regression: polynom
      yDegree: 3, //obligatory parameter for polynom regression
      //xType: "inversePower2",
      xType: "polynom",
      xDegree: 2, //obligatory parameter for polynom regression
      position: "auto",
      unit: "l",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "single draw-off",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 600,
      deviders: {
        scaleSteps: [10],
        labelSteps: [50],
        scaling: "lin",
        position: "right",
      },
      reverse: true,
    },
  },

  hotWaterStorage4: {
    scaleHgPower: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "kW",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.72,
      color: "black",
      head: "Power of heatgenerator",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 4,
      max: 18,
      deviders: {
        scaleSteps: [1],
        labelSteps: [2],
        scaling: "lin",
        position: "right",
        labelOffsetY: -0,
      },
      reverse: false,
    },

    scaleUsageVolume: {
      type: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.15,
      positionY: 0.15,
      height: 0.72,
      color: "black",
      head: "single draw-off",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 10,
      max: 200,
      deviders: {
        scaleSteps: [10],
        labelSteps: [50],
        scaling: "lin",
        position: "left",
        labelOffsetY: -0,
      },
      reverse: true,
    },
    //lookup
    //logarithmic
    scaleReheatTime: {
      type: "polynom",
      yDegree: 4,
      xType: "polynom",
      xDegree: 4,
      position: "auto",
      unit: "min",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      //tension: 0.5,
      head: "reheat time",
      offsetX: 0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 45,
      max: 330,
      deviders: {
        scaleSteps: [
          30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47,
          48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59,

          60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77,
          78, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96,
          97, 98, 99, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        ],
        labelSteps: [
          30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240,
          260, 280,
        ],
        scaling: "man",
        position: "left",
        labelOffsetX: -0.02,
        labelOffsetY: 0,
        labelRotation: 30,
      },
      reverse: false,
    },
  },

  expansionVessel1: {
    scaleSysVolume: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.2,
      positionY: 0.2,
      height: 0.7,
      color: "black",
      head: "System Volume",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 100,
      max: 1000,
      deviders: {
        scaleSteps: [50],
        labelSteps: [100],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
      },
      reverse: true,
    },

    scalePrechargePressure: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "bar",
      positionX: 0.7,
      positionY: 0.2,
      height: 0.8,
      color: "black",
      head: "Precharge Pressure",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0,
      max: 3,
      deviders: {
        scaleSteps: [0.1],
        labelSteps: [0.5],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
      reverse: true,
    },

    scaleExpansionVesselVolume: {
      type: "lookup",
      xType: "lookup",
      position: "auto",
      unit: "l",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "Expansion Vessel Volume",
      offsetX: +0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 110,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "center",
        labelOffsetY: 0,
      },
      reverse: true,
    },
  },

  expansionVessel2: {
    scaleSysVolume: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.2,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "System Volume",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0,
      max: 1000,
      deviders: {
        scaleSteps: [50],
        labelSteps: [100],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
      },
      reverse: true,
    },

    scaleExpansionVesselVolume: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "l",
      positionX: 0.8,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "Expansion Vessel Size",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 2,
      max: 40,
      deviders: {
        scaleSteps: [1],
        labelSteps: [2],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
      reverse: false,
    },

    scaleMaximumTemp: {
      type: "lookup",
      xType: "lookup",
      //			type: "logarithmic",
      //			xType: "exponent",
      position: "auto",
      unit: "°C",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      head: "Minimum Safety Temperature",
      offsetX: -0.4,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0,
      max: 100,
      deviders: {
        scaleSteps: [5],
        labelSteps: [10],
        scaling: "lin",
        position: "center",
        labelOffsetY: 0,
      },
      reverse: true,
    },
  },

  floorHeating2: {
    scalePipeDistance: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "mm",
      positionX: 0.2,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "pipe distance",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 50,
      max: 200,
      deviders: {
        scaleSteps: [5],
        labelSteps: [10],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
      },
      reverse: true,
    },
    scaleFloorArea: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "m²",
      positionX: 0.8,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "floor area",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 5,
      max: 50,
      deviders: {
        scaleSteps: [5],
        labelSteps: [10],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
      reverse: false,
    },

    scalePipeLength: {
      type: "lookup",
      xType: "lookup",
      position: "auto",
      unit: "m",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0.2,
      head: "length of \n heating pipe",
      offsetX: -0.3,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 30,
      max: 900,
      allowExtrapolation: true, // set this value to true, to draw extrapolate scale outside of table values!!
      deviders: {
        scaleSteps: [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 3, 4, 5, 6, 8],
        scaling: "log",
        position: "left",
        labelOffsetY: 0,
      },
    },

    scalePipeVolume: {
      type: "lookup",
      xType: "lookup",
      position: "auto",
      unit: "l",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0.2,
      head: "volume of \n heating pipe",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 2,
      max: 50,
      allowExtrapolation: false,
      deviders: {
        scaleSteps: [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 3, 4, 5, 6, 8],
        scaling: "log",
        position: "right",
        labelOffsetY: 0,
      },
    },
  },

  floorHeating1: {
    /*
     * scales on nomograph:
     * floorHeating1.scaleMeanTemp (manual)
     * floorHeating1.scaleFloorCoverResistance (manual)
     * floorHeating1.scalePower (auto)
     */
    scaleMeanTemp: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "°C",
      positionX: 0.2,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "MWT",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 30,
      max: 60,
      deviders: {
        scaleSteps: [1],
        labelSteps: [2],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
      },
      reverse: true,
    },
    scaleFloorCoverResistance: {
      type: "linear",
      xType: "linear",
      position: "manual",
      unit: "K/W",
      positionX: 0.8,
      positionY: 0.2,
      height: 0.75,
      color: "black",
      head: "Resistance of \n Floor covering",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0,
      max: 0.15001,
      deviders: {
        scaleSteps: [0.005],
        labelSteps: [0.02],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
      reverse: false,
    },
    scalePower: {
      type: "polynom", //new regression: polynom
      yDegree: 2, //obligatory parameter for polynom regression
      xType: "polynom",
      xDegree: 2,
      position: "auto",
      unit: "W/m²",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0.2,
      head: "power output of \n floor heating",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 40,
      max: 140,
      allowExtrapolation: true, // set this value to true, to draw extrapolate scale outside of table values!!
      deviders: {
        scaleSteps: [5],
        labelSteps: [20],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
        labelOffsetX: 0,
      },
    },
    scaleFloorTemp: {
      type: "polynom", //new regression: polynom
      yDegree: 2, //obligatory parameter for polynom regression
      xType: "polynom",
      xDegree: 2,
      position: "auto",
      unit: "°C",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0.2,
      head: "floor temperature",
      offsetX: 0.3,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 35,
      allowExtrapolation: true, // set this value to true, to draw extrapolate scale outside of table values!!
      deviders: {
        scaleSteps: [0.5],
        labelSteps: [1],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
    },
  },

  floorHeating3: {
    scalePipeLength: {
      type: "logarithmic",
      position: "manual",
      unit: "m",
      positionX: 0.2, //only needed if position is manual!
      positionY: 0.15, //only needed if position is manual!
      height: 0.8, //only needed if position is manual!
      color: "black",
      head: "length",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 1,
      max: 500,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "center",
      },
      reverse: true,
    },

    scaleFlowRate: {
      type: "logarithmic",
      position: "manual",
      unit: "l/min",
      positionX: 0.7, //only needed if position is manual!
      positionY: 0.15, //only needed if position is manual!
      height: 0.8, //only needed if position is manual!
      color: "black",
      head: "flowrate",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.1,
      max: 10,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "left",
      },
      reverse: true,
    },
    scalePower: {
      position: "twin",
      color: "black",
      unit: "kW",
      head:
        "Power \n @ " +
        userInput.floorHeating3.deltaTemp +
        "°C delta T \n @ " +
        userInput.floorHeating3.pipeDiameter * 1000 +
        " mm diameter",
      offsetX: 0,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1, 2, 5],
        scaling: "log",
        position: "right",
      },
    },
    scalePressureDrop: {
      type: "lookup",
      xType: "lookup",
      position: "auto",
      unit: "kPa",
      color: "black",
      head: "pressure drop",
      offsetX: -0.02,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      //min: 1E-5,
      //max: 35,
      deviders: {
        scaleSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        labelSteps: [1],
        scaling: "log",
        position: "right",
      },
    },
  },

  floorHeating4: {
    /*
     * scales on nomograph:
     * floorHeating1.scaleMeanTemp (manual)
     * floorHeating1.scaleFloorCoverResistance (manual)
     * floorHeating1.scalePower (auto)
     */
    scaleMeanTemp: {
      type: "quadratic",
      xType: "linear",
      position: "manual",
      unit: "°C",
      positionX: 0.2,
      positionY: 0.5,
      height: 0.5,
      width: -0.0,
      color: "black",
      head: "MWT",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 25,
      max: 50,
      deviders: {
        scaleSteps: [1],
        labelSteps: [5],
        scaling: "lin",
        position: "center",
        labelOffsetY: 0,
      },
      reverse: true,
    },
    scalePipeDistance: {
      type: "quadratic",
      xType: "linear",
      position: "manual",
      unit: "mm",
      positionX: 0.8,
      positionY: 0.2,
      height: 0.7,
      width: 0,
      color: "black",
      head: "UFH pipe distance",
      offsetX: -0.05,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 50,
      max: 350,
      deviders: {
        scaleSteps: [10],
        labelSteps: [50],
        scaling: "lin",
        position: "center",
        labelOffsetY: 0,
      },
      reverse: false,
    },
    scalePower: {
      type: "polynom", //new regression: polynom
      yDegree: 3, //obligatory parameter for polynom regression
      xType: "polynom",
      xDegree: 3,
      position: "auto",
      unit: "W/m²",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0,
      head: "power output of \n floor heating",
      offsetX: -0.1,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 120,
      allowExtrapolation: false, // set this value to true, to draw extrapolate scale outside of table values!!
      deviders: {
        scaleSteps: [1],
        labelSteps: [10],
        scaling: "lin",
        position: "left",
        labelOffsetY: 0,
        labelOffsetX: 0,
      },
    },

    scaleFloorTemp: {
      type: "polynom", //new regression: polynom
      yDegree: 3, //obligatory parameter for polynom regression
      xType: "polynom",
      xDegree: 3,
      position: "auto",
      unit: "°C",
      positionX: 0.8,
      positionY: 0.15,
      height: 0.8,
      color: "black",
      tension: 0.2,
      head: "floor temperature",
      offsetX: 0.15,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 20,
      max: 30,
      allowExtrapolation: false, // set this value to true, to draw extrapolate scale outside of table values!!
      deviders: {
        scaleSteps: [0],
        labelSteps: [27, 29],
        scaling: "lin",
        position: "right",
        labelOffsetY: 0,
      },
    },
  },

  uValue1: {
    scaleRelativePerimeter: {
      type: "sqrt",
      position: "manual",
      unit: "m",
      positionX: 0.2, //only needed if position is manual!
      positionY: 0.2, //only needed if position is manual!
      height: 0.8, //only needed if position is manual!
      color: "black",
      head: "P/A relative perimeter",
      offsetX: -0.15,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 0.2,
      max: 0.9,
      deviders: {
        scaleSteps: [0.05],
        labelSteps: [0.1],
        scaling: "lin",
        position: "left",
      },
      reverse: true,
    },
    scaleWallThicknes: {
      type: "linear",
      position: "manual",
      unit: "mm",
      positionX: 0.85, //only needed if position is manual!
      positionY: 0.2, //only needed if position is manual!
      height: 0.5, //only needed if position is manual!
      color: "black",
      head: "insulation thickness",
      offsetX: 0,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      min: 25,
      max: 150,
      deviders: {
        scaleSteps: [12.5],
        labelSteps: [25],
        scaling: "lin",
        position: "center",
      },
      reverse: false,
    },
    scaleUValue: {
      type: "lookup",

      xType: "lookup",
      position: "auto",
      unit: "W/m²K",
      color: "black",
      head: "u-value",
      offsetX: 0.1,
      min: 0.15,
      max: 0.55,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      deviders: {
        scaleSteps: [0.02],
        labelSteps: [0.1],
        scaling: "lin",
        position: "left",
      },
    },
    scaleU00Value: {
      type: "lookup",
      yDegree: 4,
      xType: "constant",
      position: "auto",
      positionX: 0.2,
      unit: "W/m²K",
      color: "black",
      head: "u-value \n no insulation",
      offsetX: 0.02,
      min: 0.3,
      max: 1.08,
      headSize: userSettings.headSize,
      labelSize: userSettings.labelSize,
      deviders: {
        scaleSteps: [0.02],
        labelSteps: [0.1],
        scaling: "lin",
        position: "right",
      },
    },
  },
};

const setData = (deltaT) => {
  userInput.massFlowCalculation.deltaTemp = deltaT;
};

var stat = {
  userSetup: userSetup,
  userInput: userInput,
  userSettings: userSettings,
  setData: setData,
};

//console.log(stat)

export { stat, userSetup, userInput, userSettings, setData };
