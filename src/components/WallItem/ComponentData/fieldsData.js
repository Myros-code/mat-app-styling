import { toSiPrefix } from "../../../math";

export const getFieldsData = (state) => {
  return [
    {
      name: "Name",
      value: state.name,
      col: "12",
      colN: "2",
      unit: "",
    },
    {
      name: "Length",
      value: state.width,
      prefData: toSiPrefix(state.width, 2, "k"),
      unit: "m",
      col: "4",
      colN: "6",
    },
    {
      name: "Height",
      value: state.height,
      prefData: toSiPrefix(state.height, 2),
      unit: "m",
      col: "4",
      colN: "6",
    },
    {
      name: "U-value",
      value: state.uValue,
      prefData: toSiPrefix(state.uValue, 2),
      unit: "W/m²K",
      col: "4",
      colN: "6",
    },
    {
      name: "Area",
      unit: "m²",
      value: state.area,
      prefData: toSiPrefix(state.area, 2),
      col: "4",
      colN: "6",
      class: "mb-4",
    },
    {
      name: "Heat loss",
      value: state.heatLoss,
      prefData: toSiPrefix(state.heatLoss),
      unit: "W",
      col: "8",
      colN: "3",
      class: "mb-4",
    },
    {
      name: "Description of layers",
      value: state.itemName,
      unit: "",
      col: "8",
      colN: "3",
      class: "mb-4",
    },
  ];
};
