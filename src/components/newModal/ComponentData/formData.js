export const getFormData = (state, heatingPower) => {
  console.log(state);
  if (state.type === "Simple room") {
    return {
      name: state.name,
      type: state.type,
      roomT: state.roomT,
      width: state.width,
      area: 0,
      airExRate: state.airExRate,
      height: state.height,
      length: state["length"],
      disusePeriod: state.disusePeriod,
      bAir: state.bAir,
      bMass: state.bMass,
      reheatTime: state.reheatTime,
      heatingPover: heatingPower,
    };
  }

  if (state.type === "Complex shaped room") {
    return {
      length: 0,
      width: 0,
      name: state.name,
      type: state.type,
      roomT: state.roomT,
      airExRate: state.airExRate,
      height: state.height,
      area: state.area,
      disusePeriod: state.disusePeriod,
      bAir: state.bAir,
      bMass: state.bMass,
      reheatTime: state.reheatTime,
      heatingPover: heatingPower,
    };
  }
};
