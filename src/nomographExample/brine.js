function brine(brineType, type, t, ratio) {
  /* type is one of the keyword in parameter object
   * t is temperature -50...80 degC
   * ratio is mass fraction between water and ethylene glycol 0...0.6  is 0% to 60% glycol
   * version: 20210115
   * output verified! 15.01.2021
   * cp is given in W * kg^-1 * K^-1
   */
  var rho, value, cp, lambda, Pr, my, Tf
   
  var parameter = {
    ethylenGlycol: {
      rho: [0, 658.49825, -54.81501, 664.71643, 232.72605, -322.61661],
      cp: [0, 5.36449, 0.78863, -2.59001, -2.73187, 1.43759],
      lambda: [0, 0.83818, -1.3762, -0.07629, 1.0772, -0.20174],
      ny: [0, -4.63024, -2.14817, -12.70106, 5.40536, 10.9899],
      Pr: [0, 3.96951, 0.70076, -12.98045, 2.64789, 11.589],
      Tf: [1.0, -0.06982, -0.3578]
    },
    propylenGlycol: {
      rho: [0, 508.41109, -182.4082, 965.76507, 280.29104, -472.2251],
      cp: [0, 4.47642, 0.60863, -0.71497, -1.93855, 0.47873],
      lambda: [0, 1.18886, -1.4911, -0.69682, 1.13633, 0.06735],
      ny: [0, -1.02798, -10.03298, -19.93497, 14.65802, 14.6205],
      Pr: [0, 6.66139, -6.9944, -18.55114, 12.0464, 14.47735],
      Tf: [1.0, -0.03736, -0.4005]
    }
  };
  if (t < -50 || t > 100) {
    console.log("Warning! temperature out of range -50..80");
  }
  if (ratio < 0 || ratio > 0.6) {
    console.log("Warning! brine ratio out of range 0..0.6");
  }

  if (brineType !== "ethylenGlycol" && brineType !== "propylenGlycol") {
    console.log(
      "Warning! unknown brinetype given to function brine." +
        "\n" +
        "         try one of: ethylenGlycol propylenGlycol"
    );
  }

  t = t + 273.15;

  switch (String(type)) {
    case "rho":
      rho =
        parameter[brineType].rho[1] +
        parameter[brineType].rho[2] * ratio +
        parameter[brineType].rho[3] * (273.15 / t) +
        parameter[brineType].rho[4] * ratio * (273.15 / t) +
        parameter[brineType].rho[5] * Math.pow(273.15 / t, 2);
        
        //correction according to clean water density line 
        // correlation for degree in °C       
        /// rho = rho * ( -2.28085791802456E-6 * Math.pow ( t , 2 ) + 8.97467778947643E-5 * t + 0.999456138905411 ) ;
        // correlation for degree in Kelvin
		rho = rho * ( -2.28085791802462E-6 * Math.pow ( t , 2 ) + 0.001335779458512 * t + 0.804764893168207 );        
      value = rho;
      break;
    case "cp":
      cp =
        parameter[brineType].cp[1] +
        parameter[brineType].cp[2] * ratio +
        parameter[brineType].cp[3] * (273.15 / t) +
        parameter[brineType].cp[4] * ratio * (273.15 / t) +
        parameter[brineType].cp[5] * Math.pow(273.15 / t, 2);
      value = cp * 1000;
      break;
    case "lambda":
      lambda =
        parameter[brineType].lambda[1] +
        parameter[brineType].lambda[2] * ratio +
        parameter[brineType].lambda[3] * (273.15 / t) +
        parameter[brineType].lambda[4] * ratio * (273.15 / t) +
        parameter[brineType].lambda[5] * Math.pow(273.15 / t, 2);
      value = lambda;
      break;
    case "my":
      my = Math.exp(
        parameter[brineType].ny[1] +
          parameter[brineType].ny[2] * ratio +
          parameter[brineType].ny[3] * (273.15 / t) +
          parameter[brineType].ny[4] * ratio * (273.15 / t) +
          parameter[brineType].ny[5] * Math.pow(273.15 / t, 2)
      );
      value = my;
      break;
    case "Pr":
      Pr = Math.exp(
        parameter[brineType].Pr[1] +
          parameter[brineType].Pr[2] * ratio +
          parameter[brineType].Pr[3] * (273.15 / t) +
          parameter[brineType].Pr[4] * ratio * (273.15 / t) +
          parameter[brineType].Pr[5] * Math.pow(273.15 / t, 2)
      );
      value = Pr;
      break;
    case "Tf":
      //Tf=parameter[brineType].Tf[0]
      Tf =
        -273.15 +
        273.15 *
          (parameter[brineType].Tf[0] +
            parameter[brineType].Tf[1] * ratio +
            parameter[brineType].Tf[2] * Math.pow(ratio, 2));
      value = Tf;
      break;
    default:
      console.log(
        "Warning! unknown parameter type given to function brine" +
          "\n" +
          "         try one of: rho cp lambda ny Pr Tf"
      );
  }

  return value;
}

export { brine };
