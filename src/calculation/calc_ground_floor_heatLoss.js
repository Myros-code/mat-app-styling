// t - insulation thickness [m]
// y - thermal conductivity [W/mK]
// area - area of room [m²]
// P - perimeter of exposed walls [m]
// U - thermal resistivity [W/m²K]

export const calc_ground_floor_heatLoss = (t, P, area, y) => {
  if (t === 0) {
    const U = -0.4993 * ((P / area) * (P / area)) + 1.5095 * (P / area) + 0.1234;
    return U;
  }

  if (t >= 0.025) {
    const a1 = -0.0545621;
    const a2 =  0.3016047;
    const a3 = -0.575197;
    const b1 =  0.1436498;
    const b2 = -0.7512028;
    const b3 =  1.263755;
    const c1 = -0.0078826;
    const c2 =  0.0119111;
    const c3 =  0.153662;

    const A = a1 * ((t / y) * (t / y)) + a2 * (t / y) + a3;
    const B = b1 * ((t / y) * (t / y)) + b2 * (t / y) + b3;
    const C = c1 * ((t / y) * (t / y)) + c2 * (t / y) + c3;

    const U = A * ((P / area) * (P / area)) + B * (P / area) + C;
    return U;
  }

  if (t !== 0 && t <= 0.025) {
    const U1 =
      -0.4993 * ((P / area) * (P / area)) + 1.5095 * (P / area) + 0.1234;

    const a1 = -0.0545621;
    const a2 = 0.3016047;
    const a3 = -0.575197;
    const b1 = 0.1436498;
    const b2 = -0.7512028;
    const b3 = 1.263755;
    const c1 = -0.0078826;
    const c2 = 0.0119111;
    const c3 = 0.153662;

    const A = a1 * ((t / y) * (t / y)) + a2 * (t / y) + a3;
    const B = b1 * ((t / y) * (t / y)) + b2 * (t / y) + b3;
    const C = c1 * ((t / y) * (t / y)) + c2 * (t / y) + c3;

    const U2 = A * ((P / area) * (P / area)) + B * (P / area) + C;

    return (U1 + U2) / 2;
  }


};
console.log(calc_ground_floor_heatLoss(0.05,5,25,0.04));