import {
  ADD_ROOM,
  DELETE_ROOM,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ROOM,
  EDIT_ROOM_ITEM,
  CHANGE_ROOM_VALUE,
  CALCULATE_ROOM_DATA,
  CALCULATE_ITEM_DATA,
  ADD_WALLITEM,
  DELETE_WALLITEM,
  EDIT_ROOM_WALL_ITEM,
} from "../../actionTypes/actionTypes";
import { v4 as uuidv4 } from "uuid";

export const change_room_value = (roomId, labelName, value) => {
  return {
    type: CHANGE_ROOM_VALUE,
    payload: {
      roomId: roomId,
      labelName: labelName,
      value: value,
    },
  };
};

export const add_room_action = (data) => {
  return {
    type: ADD_ROOM,
    payload: {
      id: uuidv4(),
      name: data.name,
      type: data.type,
      roomT: data.roomT,
      deltaT: 0,
      height: data.height,
      length: data.length,
      area: data.area,
      width: data.width,
      totalWallArea: 0,
      specHeatLoss: 0,
      totalHeatLoss: 0,
      transmissionLoss: 0,
      airHeated: 0,
      airExRate: data.airExRate,
      airEx: 0,
      roomVolume: 0,
      venHeatLoss: 0,
      yearlyHeat: 0,
      hightCeilingF: 0,
      ceilingHeatLoss: 0,
      disusePeriod: data.disusePeriod,
      bAir: data.bAir,
      bMass: data.bMass,
      reheatTime: data.reheatTime,
      heatingPover: data.heatingPover,
      reheatPover: 0,
      items: [],
    },
  };
};

export const edit_room_action = (roomId, data) => {
  return {
    type: EDIT_ROOM,
    payload: {
      roomId: roomId,
      data: data,
    },
  };
};

export const edit_item_action = (roomId, itemId, data) => {
  return {
    type: EDIT_ROOM_ITEM,
    payload: {
      roomId: roomId,
      itemId: itemId,
      data: data,
    },
  };
};

export const edit_wallItem_action = (data, roomIdx, wallIdx, itemIdx) => {
  return {
    type: EDIT_ROOM_WALL_ITEM,
    payload: {
      roomIdx,
      wallIdx,
      itemIdx,
      data: data,
    },
  };
};

export const delete_room_action = (roomId) => {
  return {
    type: DELETE_ROOM,
    payload: roomId,
  };
};

export const add_item_action = (data, pos) => {
  return {
    type: ADD_ITEM,
    payload: {
      pos,
      data,
    },
  };
};

export const add_wallItem_action = (data, roomIdx, wallIdx) => {
  return {
    type: ADD_WALLITEM,
    payload: {
      roomIdx,
      wallIdx,
      data: {
        id: uuidv4(),
        name: data.name,
        itemName: data.itemName,
        exWallGroup: data.exWallGroup,
        exWallGroup1: data.exWallGroup1,
        exWallGroup2: data.exWallGroup2,
        uValue: data.uValue,
        height: data.height,
        width: data.width,
        area: data.area,
        deltaT: data.deltaT,
        heatLoss: data.heatLoss,
      },
    },
  };
};

export const delete_wallItem_action = (roomIdx, wallIdx, wallItemIdx) => {
  return {
    type: DELETE_WALLITEM,
    payload: {
      roomIdx,
      wallIdx,
      wallItemIdx,
    },
  };
};

export const delete_item_action = (roomId, itemId) => {
  return {
    type: DELETE_ITEM,
    payload: {
      roomId,
      itemId,
    },
  };
};

export const calculate_room_data = (roomId, data) => {
  return {
    type: CALCULATE_ROOM_DATA,
    roomId: roomId,
    payload: data,
  };
};

export const calculate_all_app_data = (state) => {
  return {
    type: "CALCULATE_ALL_APP_DATA",
    payload: {
      state,
    },
  };
};

export const calculate_item_data = (roomId, itemId, data) => {
  return {
    type: CALCULATE_ITEM_DATA,
    roomId: roomId,
    itemId: itemId,
    payload: data,
  };
};

export const calculate_wallItem_data = (roomId, wallId, itemId, data) => {
  return {
    type: "CALCULATE_WALL_ITEM_DATA",
    roomId: roomId,
    wallId: wallId,
    itemId: itemId,
    payload: data,
  };
};
