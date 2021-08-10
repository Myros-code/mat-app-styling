export const calc_hight_ceiling = (h) => {
  const C1 = -0.0003211;
  const C2 = 0.0066687;
  const C3 = -0.0209595;
  const C4 = 0.0164119;
  if (h <= 2 || h >= 8) {
    return 0;
  } else {
    const fCeiling = C1 * (h * h * h) + C2 * (h * h) + C3 * h + C4;
    return fCeiling;
  }
};
