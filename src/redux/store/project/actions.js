import { CALCULATE_PROJECT_DATA } from "../../actionTypes/actionTypes";

export const calculate_project_data = (rooms) => {
  return {
    type: CALCULATE_PROJECT_DATA,
    payload: rooms,
  };
};


export const edit_project_action = (data) => {
  return {
    type: 'EDIT_PROJECT',
    payload: {
      data: data,
    },
  };
};