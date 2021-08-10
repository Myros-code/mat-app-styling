import { toSiPrefix } from "../../../../../math";

export const getTableData = (state) => {
  return [
    {
      name: "Temp outside",
      value: state.outsideT,
      unit: "°С",
    },
    {
      name: "Ground temp",
      value: state.groundT,
      unit: "°С",
    },
    {
      name: "Degree-days",
      value: state.dDays,
      unit: "",
    },
    {
      name: "Total floor area",
      value: state.totalFloorArea,
      prefData: toSiPrefix(state.totalFloorArea),
      unit: "m²",
    },
    {
      name: "Annual heating consumption",
      value: state.yearlyHeat,
      prefData: toSiPrefix(state.yearlyHeat),
      unit: "Wh",
    },
    {
      name: "Ventilation-loss",
      value: state.venHeatLoss,
      prefData: toSiPrefix(state.venHeatLoss),
      unit: "W",
    },
    {
      name: "Transmission-loss",
      value: state.transmissionLoss,
      prefData: toSiPrefix(state.transmissionLoss),
      unit: "W",
    },
    {
      name: "Total-heat-loss",
      value: state.totalHeatLoss,
      prefData: toSiPrefix(state.totalHeatLoss),
      unit: "W",
    },
    {
      name: "Specific heat loss",
      value: state.specHeatLoss,
      prefData: toSiPrefix(state.specHeatLoss),
      unit: "W/m²",
    },
    {
      name: "Thermal bridges",
      value: state.buildingType,
      prefData: toSiPrefix(state.buildingType),
      unit: "W/m²K",
    },
  ];
};
