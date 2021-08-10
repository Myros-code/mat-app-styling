import { toSiPrefix } from "../../../../../math";

export const getTableData = (state) => {
  if (state.type === "Simple room") {
    return [
      {
        name: "Name",
        value: state.name,
        unit: "",
      },
      {
        name: "Type",
        value: state.type,
        unit: "",
      },
      {
        name: "Width",
        value: state.width,
        prefData: toSiPrefix(state.width),
        unit: "m",
      },
      {
        name: "Length",
        value: state["length"],
        prefData: toSiPrefix(state["length"]),
        unit: "m",
      },
      {
        name: "Height",
        value: state.height,
        prefData: toSiPrefix(state.height),
        unit: "m",
      },
      {
        name: "Room temp",
        value: state.roomT,
        prefData: toSiPrefix(state.roomT),
        unit: "°С",
      },
      {
        name: "Room volume",
        value: state.roomVolume,
        prefData: toSiPrefix(state.roomVolume),
        unit: "m³",
      },
      {
        name: "Room floor area",
        value: state.area,
        prefData: toSiPrefix(state.area),
        unit: "m²",
      },
      {
        name: "Exchange-rate",
        value: state.airExRate,
        prefData: toSiPrefix(state.airExRate),
        unit: "AC/h",
      },
      {
        name: "Yearly-heat",
        value: state.yearlyHeat,
        prefData: toSiPrefix(state.yearlyHeat, 0, "k"),
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
        name: "Specific heat loss",
        value: state.specHeatLoss,
        prefData: toSiPrefix(state.specHeatLoss),
        unit: "W/m²",
      },
      {
        name: "Total-heat-loss",
        value: state.totalHeatLoss,
        prefData: toSiPrefix(state.totalHeatLoss),
        unit: "W",
      },
    ];
  }
  if (state.type === "Complex shaped room") {
    return [
      {
        name: "Name",
        value: state.name,
        unit: "",
      },
      {
        name: "Type",
        value: state.type,
        unit: "",
      },
      {
        name: "Area",
        value: state.area,
        prefData: toSiPrefix(state.area),
        unit: "m²",
      },
      {
        name: "Height",
        value: state.height,
        prefData: toSiPrefix(state.height),
        unit: "m",
      },
      {
        name: "Room temp",
        value: state.roomT,
        prefData: toSiPrefix(state.roomT),
        unit: "°С",
      },
      {
        name: "Room volume",
        value: state.roomVolume,
        prefData: toSiPrefix(state.roomVolume),
        unit: "m³",
      },
      {
        name: "Room floor area",
        value: state.area,
        prefData: toSiPrefix(state.area),
        unit: "m²",
      },
      {
        name: "Exchange-rate",
        value: state.airExRate,
        prefData: toSiPrefix(state.airExRate),
        unit: "AC/h",
      },
      {
        name: "Yearly-heat",
        value: state.yearlyHeat,
        prefData: toSiPrefix(state.yearlyHeat, 0, "k"),
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
        name: "Specific heat loss",
        value: state.specHeatLoss,
        prefData: toSiPrefix(state.specHeatLoss),
        unit: "W/m²",
      },

      {
        name: "Total-heat-loss",
        value: state.totalHeatLoss,
        prefData: toSiPrefix(state.totalHeatLoss),
        unit: "W",
      },
    ];
  }
};
