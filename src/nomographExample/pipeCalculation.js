import { brine } from "./brine.js";

function pipeCalculation(temp, volumeFlow, diameter) {
  var rho = 1000;
  var k = 0.0015;
  var Re = 30000;
  var lambda = [];
  volumeFlow = toSiUnits(volumeFlow, userSetup.units.volumeFlow);
  diameter = toSiUnits(diameter, userSetup.units.pipeDiameter);

  // calculate lambda in iterations
  lambda[0] = 0.11 * Math.pow(k / diameter + 68 / Re, 0.25);
  console.log(lambda[0]);
  lambda[1] = Math.pow(
    1 /
      (-2 *
        Math.log10(
          2.51 / (Re * Math.pow(lambda[0], 0.5)) + k / diameter / 3.7
        )),
    2
  );
  lambda[3] = Math.abs(lambda[0] - lambda[1]);
  lambda[0] = lambda[1];

  console.log(lambda[0]);

  lambda[1] = Math.pow(
    1 /
      (-2 *
        Math.log10(
          2.51 / (Re * Math.pow(lambda[0], 0.5)) + k / diameter / 3.7
        )),
    2
  );
  lambda[3] = Math.abs(lambda[0] - lambda[1]);
  lambda[0] = lambda[1];

  console.log(lambda[0]);
  lambda[1] = Math.pow(
    1 /
      (-2 *
        Math.log10(
          2.51 / (Re * Math.pow(lambda[0], 0.5)) + k / diameter / 3.7
        )),
    2
  );
  lambda[3] = Math.abs(lambda[0] - lambda[1]);
  lambda[0] = lambda[1];

  console.log(lambda[0]);

  v = (volumeFlow * 4) / (Math.PI * Math.pow(diameter, 2)); // m/s
  p = (lambda[0] * rho * Math.pow(v, 2) * 0.38) / (diameter * 2); // Pa
  console.log(p);
  //p = 150;

  //p=100
  //v=5
  console.log(p + ":" + v + ":" + volumeFlow + ":" + diameter);
  return { velocity: v, pressure: p };
}

export { pipeCalculation };
