import { toSiPrefix } from "../../../../../math";



export const getTableData = (state, roomType) => {
  if (state.exWallGroup === "ground floor") {
    if (roomType === "Simple room") {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
          unit: "",
        },
        {
          name: "Length",
          value: state.length,
          unit: "m",
          prefData: toSiPrefix(state["length"]),
        },
        {
          name: "Width",
          value: state.width,
          unit: "m",
          prefData: toSiPrefix(state.width),
        },
        {
          name: "Exposed perimeter",
          value: state.expPerimeter,
          prefData: toSiPrefix(state.expPerimeter),
          unit: "m",
        },
        {
          name: "Area",
          value: state.area,
          prefData: toSiPrefix(state.area),
          unit: "m²",
        },
        {
          name: "Thermal conductivity of insulation",
          value: state.thermInsul,
          prefData: toSiPrefix(state.thermInsul),
          unit: "W/mK",
        },
        {
          name: "Thickness of insulation",
          value: state.thickInsul,
          prefData: toSiPrefix(state.thickInsul),
          unit: "m",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
      ];
    }
    if (roomType === "Complex shaped room") {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
          unit: "",
        },
        {
          name: "Exposed perimeter",
          value: state.expPerimeter,
          prefData: toSiPrefix(state.expPerimeter),
          unit: "m",
        },
        {
          name: "Area",
          value: state.area,
          prefData: toSiPrefix(state.area),
          unit: "m²",
        },
        {
          name: "Thermal conductivity of insulation",
          value: state.thermInsul,
          prefData: toSiPrefix(state.thermInsul),
          unit: "W/mK",
        },
        {
          name: "Thickness of insulation",
          value: state.thickInsul,
          prefData: toSiPrefix(state.thickInsul),
          unit: "m",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
      ];
    }
  } else if (state.exWallGroup === "roof") {
    if (roomType === "Simple room") {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
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
          value: state.length,
          prefData: toSiPrefix(state.length),
          unit: "m",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Area",
          unit: "m²",
          value: state.area,
          prefData: toSiPrefix(state.area),
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
        {
          name: "Description of layers",
          value: state.itemName,
          unit: "",
        },
      ];
    }
    if (roomType === "Complex shaped room") {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
          unit: "",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Area",
          unit: "m²",
          value: state.area,
          prefData: toSiPrefix(state.area),
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
        {
          name: "Description of layers",
          value: state.itemName,
          unit: "",
        },
      ];
    }
  } else {
    if (state.external) {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
          unit: "",
        },
        {
          name: "Length",
          value: state.length,
          prefData: toSiPrefix(state.length),
          unit: "m",
        },
        {
          name: "Height",
          value: state.height,
          prefData: toSiPrefix(state.height),
          unit: "m",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Area",
          unit: "m²",
          value: state.area,
          prefData: toSiPrefix(state.area),
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
        {
          name: "Description of layers",
          value: state.itemName,
          unit: "",
        },
      ];
    } else {
      return [
        {
          name: "Name",
          value: state.name,
          unit: "",
        },
        {
          name: "Type",
          value: state.exWallGroup,
          unit: "",
        },
        {
          name: "Length",
          value: state.length,
          prefData: toSiPrefix(state.length),
          unit: "m",
        },
        {
          name: "Height",
          value: state.height,
          prefData: toSiPrefix(state.height),
          unit: "m",
        },
        {
          name: "U-value",
          value: state.uValue,
          prefData: toSiPrefix(state.uValue),
          unit: "W/m²K",
        },
        {
          name: "Area",
          unit: "m²",
          value: state.area,
          prefData: toSiPrefix(state.area),
        },
        {
          name: "Heat loss",
          value: state.heatLoss,
          prefData: toSiPrefix(state.heatLoss),
          unit: "W",
        },
        {
          name: "Description of layers",
          value: state.itemName,
          unit: "",
        },
        {
          name: "Temperature of neighbor room",
          value: state.tempNroom,
          prefData: toSiPrefix(state.tempNroom),
          unit: "°С",
        },
      ];
    }
  }
};
