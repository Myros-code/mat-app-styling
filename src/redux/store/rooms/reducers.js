import { calc_all_data } from "../../../calculation/calc_all_data";
import { calc_room_data } from "../../../calculation/calc_room_data";
import { calc_wall_data } from "../../../calculation/calc_wall_data";

const initialState = [
  // {
  //   id: "1",
  //   name: "Bed-room",
  //   type: "Simple room",
  //   roomT: 2,
  //   deltaT: 0,
  //   height: 1,
  //   area: 0,
  //   length: 3,
  //   width: 2,
  //   airExRate: 5,
  //   airEx: 0,
  //   roomVolume: 0,
  //   venHeatLoss: 0,
  //   airHeated: 0,
  //   transmissionLoss: 0,
  //   totalWallArea: 0,
  //   totalHeatLoss: 0,
  //   yearlyHeat: 0,
  //   hightCeilingF: 0,
  //   ceilingHeatLoss: 0,
  //   disusePeriod: 8,
  //   bAir: "low",
  //   bMass: "low",
  //   reheatTime: 0.5,
  //   heatingPover: 63,
  //   reheatPover: 0,
  //   items: [
  //     {
  //       id: "1",
  //       name: "redux room 1 item 1",
  //       type: "redux room 1 item type 1",
  //       uValue: 3.1,
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       external: true,
  //       itemName: "102 mm brick, plaster",
  //       height: 2,
  //       width: 5,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //   ],
  // },
  // {
  //   id: "2",
  //   name: "Kitchen",
  //   type: "Simple room",
  //   area: 0,
  //   roomT: 5,
  //   height: 2,
  //   length: 2,
  //   width: 2,
  //   deltaT: 0,
  //   airHeated: 0,
  //   airExRate: 1,
  //   airEx: 0,
  //   roomVolume: 0,
  //   venHeatLoss: 0,
  //   transmissionLoss: 0,
  //   totalWallArea: 0,
  //   totalHeatLoss: 0,
  //   yearlyHeat: 0,
  //   hightCeilingF: 0,
  //   ceilingHeatLoss: 0,
  //   disusePeriod: 8,
  //   bAir: "low",
  //   bMass: "low",
  //   reheatTime: 0.5,
  //   heatingPover: 63,
  //   reheatPover: 0,
  //   items: [
  //     {
  //       id: "1",
  //       name: "redux room 2 item 1",
  //       type: "redux room 2 item type 1",
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       uValue: 3.1,
  //       external: true,
  //       itemName: "102 mm brick, plaster",
  //       height: 3,
  //       width: 4,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //     {
  //       id: "2",
  //       name: "redux room 2 item 2",
  //       type: "redux room 2 item type 2",
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       uValue: 3.1,
  //       itemName: "102 mm brick, plaster",
  //       height: 3,
  //       width: 3,
  //       external: true,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //   ],
  // },
  // {
  //   id: "3",
  //   name: "Attic",
  //   type: "Simple room",
  //   roomT: 4,
  //   area: 0,
  //   height: 3,
  //   length: 3,
  //   width: 3,
  //   deltaT: 0,
  //   totalWallArea: 0,
  //   totalHeatLoss: 0,
  //   transmissionLoss: 0,
  //   airExRate: 5,
  //   airEx: 0,
  //   roomVolume: 0,
  //   venHeatLoss: 0,
  //   airHeated: 0,
  //   yearlyHeat: 0,
  //   hightCeilingF: 0,
  //   ceilingHeatLoss: 0,
  //   disusePeriod: 8,
  //   bAir: "low",
  //   bMass: "low",
  //   reheatTime: 0.5,
  //   heatingPover: 63,
  //   reheatPover: 0,
  //   items: [
  //     {
  //       id: "1",
  //       name: "redux room 3 item 1",
  //       type: "redux room 3 item type 1",
  //       uValue: 3.1,
  //       itemName: "102 mm brick, plaster",
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       height: 3,
  //       external: true,
  //       width: 5,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //     {
  //       id: "2",
  //       name: "redux room 3 item 2",
  //       type: "redux room 3 item type 2",
  //       uValue: 3.1,
  //       itemName: "102 mm brick, plaster",
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       external: true,
  //       height: 6,
  //       width: 3,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //     {
  //       id: "3",
  //       name: "redux room 3 item 3",
  //       type: "redux room 3 item type 3",
  //       uValue: 3.1,
  //       itemName: "102 mm brick, plaster",
  //       exWallGroup: "external wall",
  //       exWallGroup1: "Solid brick wall, dense plaster",
  //       exWallGroup2: "102 mm brick",
  //       external: true,
  //       height: 5,
  //       width: 5,
  //       area: 0,
  //       heatLoss: 0,
  //       items: [],
  //     },
  //   ],
  // },
];

export const roomsReducer = (state = initialState, action) => {
  let newState;
  let roomIdx;
  let itemIdx;
  let a;
  let b;
  switch (action.type) {
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "ADD_ROOM":
      console.log(action.payload);
      return [...state, action.payload];
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "EDIT_ROOM":
      newState = [...state];
      roomIdx = state.findIndex((el) => {
        return el.id === action.payload.roomId;
      });

      a = newState[roomIdx];
      b = action.payload.data;

      if (b.type === "Simple room") {
      }
      if (b.type === "Complex shaped room") {
      }
      a.name = b.name;
      a.type = b.type;
      a.width = b.width;
      a.height = b.height;
      a.area = b.area;
      a.roomT = b.roomT;
      a.airExRate = b.airExRate;
      a["length"] = b["length"];
      a.disusePeriod = b.disusePeriod;
      a.bAir = b.bAir;
      a.bMass = b.bMass;
      a.reheatTime = b.reheatTime;
      a.heatingPover = b.heatingPover;
      console.log(b);
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "DELETE_ROOM":
      newState = state.filter((el) => {
        return el.id !== action.payload;
      });
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "ADD_ITEM":
      newState = [...state];
      a = action.payload;
      newState[a.pos - 1].items = [...state[a.pos - 1].items, a.data];
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "EDIT_ROOM_ITEM":
      newState = [...state];
      roomIdx = state.findIndex((el) => {
        return el.id === action.payload.roomId;
      });
      itemIdx = state[roomIdx].items.findIndex((el) => {
        return el.id === action.payload.itemId;
      });

      if (action.payload.data.exWallGroup === "ground floor") {
        newState[roomIdx].items[itemIdx].name = action.payload.data.name;
        newState[roomIdx].items[itemIdx].expPerimeter =
          action.payload.data.expPerimeter;
        newState[roomIdx].items[itemIdx].floorArea =
          action.payload.data.floorArea;
        newState[roomIdx].items[itemIdx].thermInsul =
          action.payload.data.thermInsul;
        newState[roomIdx].items[itemIdx].thickInsul =
          action.payload.data.thickInsul;
        newState[roomIdx].items[itemIdx].length = action.payload.data.length;
        newState[roomIdx].items[itemIdx].width = action.payload.data.width;
        newState[roomIdx].items[itemIdx].area = action.payload.data.area;
      } else if (action.payload.data.exWallGroup === "roof") {
        newState[roomIdx].items[itemIdx].name = action.payload.data.name;
        newState[roomIdx].items[itemIdx].type = action.payload.data.type;
        newState[roomIdx].items[itemIdx].uValue = action.payload.data.uValue;
        newState[roomIdx].items[itemIdx].itemName =
          action.payload.data.itemName;
        newState[roomIdx].items[itemIdx].length = action.payload.data.length;
        newState[roomIdx].items[itemIdx].width = action.payload.data.width;

        newState[roomIdx].items[itemIdx].area =
          action.payload.data.length * action.payload.data.width;
        newState[roomIdx].items[itemIdx].exWallGroup =
          action.payload.data.exWallGroup;
        newState[roomIdx].items[itemIdx].exWallGroup1 =
          action.payload.data.exWallGroup1;
        newState[roomIdx].items[itemIdx].exWallGroup2 =
          action.payload.data.exWallGroup2;
      } else {
        newState[roomIdx].items[itemIdx].name = action.payload.data.name;
        newState[roomIdx].items[itemIdx].type = action.payload.data.type;
        newState[roomIdx].items[itemIdx].uValue = action.payload.data.uValue;
        newState[roomIdx].items[itemIdx].itemName =
          action.payload.data.itemName;
        newState[roomIdx].items[itemIdx].length = action.payload.data.length;
        newState[roomIdx].items[itemIdx].height = action.payload.data.height;
        newState[roomIdx].items[itemIdx].area =
          action.payload.data.height * action.payload.data.length;
        newState[roomIdx].items[itemIdx].exWallGroup =
          action.payload.data.exWallGroup;
        newState[roomIdx].items[itemIdx].exWallGroup1 =
          action.payload.data.exWallGroup1;
        newState[roomIdx].items[itemIdx].exWallGroup2 =
          action.payload.data.exWallGroup2;
      }

      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "DELETE_ITEM":
      roomIdx = state.findIndex((el) => {
        return el.id === action.payload.roomId;
      });
      newState = [...state];
      const newItems = [...newState[roomIdx].items].filter((el) => {
        return el.id !== action.payload.itemId;
      });
      newState[roomIdx].items = newItems;
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "CHANGE_ROOM_VALUE":
      newState = [...state];
      a = action.payload;
      newState[a.roomId][`${a.labelName}`] = a.value;
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "ADD_WALLITEM":
      newState = [...state];
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items = [
        ...state[action.payload.roomIdx].items[action.payload.wallIdx].items,
        action.payload.data,
      ];
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "EDIT_ROOM_WALL_ITEM":
      newState = [...state];
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].name = action.payload.data.name;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].type = action.payload.data.type;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].uValue = action.payload.data.uValue;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].itemName = action.payload.data.itemName;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].height = action.payload.data.height;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].width = action.payload.data.width;
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items[
        action.payload.itemIdx
      ].area = action.payload.data.area;
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "DELETE_WALLITEM":
      newState = [...state];
      const newWallItems = [
        ...newState[action.payload.roomIdx].items[action.payload.wallIdx].items,
      ].filter((el, id) => {
        return id !== action.payload.wallItemIdx;
      });
      newState[action.payload.roomIdx].items[action.payload.wallIdx].items =
        newWallItems;
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "CALCULATE_ROOM_DATA":
      newState = [...state];
      calc_room_data(newState[action.roomId], action.payload.outsideT);
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "CALCULATE_ITEM_DATA":
      newState = [...state];
      calc_wall_data(
        newState[action.roomId].items[action.itemId],
        action.payload.deltaT,
        action.payload.buildingTypeValue
      );
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "CALCULATE_WALL_ITEM_DATA":
      newState = [...state];
      a = newState[action.roomId].items[action.wallId].items[action.itemId];
      a.area = a.height * a.width;
      if (newState[action.roomId].items[action.wallId].external) {
        a.heatLoss =
          a.uValue * a.area * action.payload.deltaT +
          action.payload.buildingTypeValue;
      } else {
        a.heatLoss =
          a.uValue *
            a.area *
            newState[action.roomId].items[action.wallId].tempNroom +
          action.payload.buildingTypeValue;
      }
      return newState;
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    case "CALCULATE_ALL_APP_DATA":
      return calc_all_data(action.payload.state);
    // --------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------
    default:
      return state;
  }
};
