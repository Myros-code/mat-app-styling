import { CALCULATE_PROJECT_DATA } from "../../actionTypes/actionTypes";

const initialState = {
  name: "Project №1 - Home",
  outsideT: -3,
  groundT: 20,
  dDays: 2000,
  totalHeatLoss: 0,
  venHeatLoss: 0,
  totalFloorArea: 0,
  transmissionLoss: 0,
  yearlyHeat: 0,
  buildingType: 0,
};

const calculateFunc = (arr, value) => {
  return arr.reduce((prev, cur) => {
    return Number(prev) + Number(cur[value]);
  }, 0);
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_PROJECT_DATA:
      let newState = { ...state };
      newState.totalHeatLoss = calculateFunc(action.payload, "totalHeatLoss");
      newState.venHeatLoss = calculateFunc(action.payload, "venHeatLoss");
      newState.transmissionLoss = calculateFunc(
        action.payload,
        "transmissionLoss"
      );
      newState.totalFloorArea = calculateFunc(action.payload, "area");
      newState.yearlyHeat = calculateFunc(action.payload, "yearlyHeat");
      newState.specHeatLoss = newState.totalHeatLoss / newState.totalFloorArea;
      return newState;
    case "EDIT_PROJECT":
      let news = { ...state };
      let b = action.payload.data;
      news.name = b.name;
      news.outsideT = b.outsideT;
      news.groundT = b.groundT;
      news.dDays = b.dDays;
      news.buildingType = b.buildingType;
      return news;
    default:
      return state;
  }
};
