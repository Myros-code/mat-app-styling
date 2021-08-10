export const getFormData = (state) => {
  return {
    name: state.name,
    outsideT: Number(state.outsideT),
    groundT: Number(state.groundT),
    dDays: Number(state.dDays),
    buildingType: Number(state.buildingType),
  };
};
