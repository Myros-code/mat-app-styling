export const getFormData = (state, choosedElement, roomType) => {
  // state - form values object
  // choosedElement - object with data of choosed room building element

  // ground floor have another data for calculation
  // so I devide them with the condition

  if (state.exWallGroup === "ground floor") {
    if (roomType === "Simple room") {
      return {
        name: state.name,
        expPerimeter: state.expPerimeter,
        exWallGroup: state.exWallGroup,
        length: state["length"],
        width: state.width,
        area: state["length"] * state.width,
        external: true,
        thermInsul: state.thermInsul,
        thickInsul: state.thickInsul,
        uValue: 0,
        heatLoss: 0,
        items: [],
      };
    }
    if (roomType === "Complex shaped room") {
      return {
        name: state.name,
        expPerimeter: state.expPerimeter,
        exWallGroup: state.exWallGroup,
        length: 0,
        width: 0,
        area: state.floorArea,
        external: true,
        thermInsul: state.thermInsul,
        thickInsul: state.thickInsul,
        uValue: 0,
        heatLoss: 0,
        items: [],
      };
    }
  } else if (state.exWallGroup === "roof") {
    if (roomType === "Simple room") {
      console.log(state);
      return {
        name: state.name,
        itemName: choosedElement.name,
        exWallGroup: state.exWallGroup,
        exWallGroup1: state.exWallGroup1,
        exWallGroup2: state.exWallGroup2,
        external: choosedElement.external,
        opening: choosedElement.opening,
        uValue: Number(state.uValue),
        length: state.length,
        width: state.width,
        area: state["length"] * state.width,
        heatLoss: 0,
        items: [],
      };
    }
    if (roomType === "Complex shaped room") {
      return {
        name: state.name,
        itemName: choosedElement.name,
        exWallGroup: state.exWallGroup,
        exWallGroup1: state.exWallGroup1,
        exWallGroup2: state.exWallGroup2,
        external: choosedElement.external,
        opening: choosedElement.opening,
        uValue: Number(state.uValue),
        length: 0,
        width: 0,
        area: state.area,
        heatLoss: 0,
        items: [],
      };
    }
  } else {
    //create object data for new wall or roof
    const obj = {
      name: state.name,
      itemName: choosedElement.name,
      exWallGroup: state.exWallGroup,
      exWallGroup1: state.exWallGroup1,
      exWallGroup2: state.exWallGroup2,
      external: choosedElement.external,
      opening: choosedElement.opening,
      uValue: Number(state.uValue),
      height: state.height,
      area: state.length * state.height,
      length: state['length'],
      heatLoss: 0,
      items: [],
    };

    // if wall type = internal, add new entire "temperature neighbor room"
    if (!state.external) {
      obj.tempNroom = state.tempNroom;
    }

    return obj;
  }
};


