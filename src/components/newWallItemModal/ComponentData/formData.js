export const getFormData = (state, choosedElement) => {
  // state - form values object
  // choosedElement - object with data of choosed room building element

  //create object data for new wall or roof
  const obj = {
    name: state.name,
    itemName: choosedElement.name,
    uValue: Number(state.uValue),
    exWallGroup: state.exWallGroup,
    exWallGroup1: state.exWallGroup1,
    exWallGroup2: state.exWallGroup2,
    external: choosedElement.external,
    opening: choosedElement.opening,
    height: state.height,
    area: state.height * state.width,
    width: state.width,
    heatLoss: 0,
  };

  // if wall type = internal, add new entire "temperature neighbor room"
  if (!state.external) {
    obj.tempNroom = state.tempNroom;
  }

  return obj;
};
