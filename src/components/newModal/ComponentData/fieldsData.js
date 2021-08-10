export const getFieldsData = (state) => {
  if (state.type === "Simple room") {
    return [
      {
        type: "text",
        placeholder: "Name",
        value: state.name,
        name: "name",
      },
      {
        type: "select",
        placeholder: "Room type",
        value: state.type,
        name: "type",
        options: [
          {
            name: "Simple room",
            value: "Simple room",
          },
          {
            name: "Complex shaped room",
            value: "Complex shaped room",
          },
        ],
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Room temperature [°С]",
        value: state.roomT,
        name: "roomT",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Air exchange rate [AC/h]",
        value: state.airExRate,
        name: "airExRate",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Width [m]",
        value: state.width,
        name: "width",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Height [m]",
        value: state.height,
        name: "height",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Length [m]",
        value: state["length"],
        name: "length",
        step: 0.1,
      },
      {
        type: "response capacity divider",
      },
      {
        type: "select",
        placeholder: "Period of disuse [h]",
        value: state.disusePeriod,
        name: "disusePeriod",
        options: [
          {
            name: "8 hours",
            value: "8",
          },
          {
            name: "11 hours",
            value: "11",
          },
          {
            name: "14 hours",
            value: "14",
          },
          {
            name: "weekend setback (62 hours)",
            value: "62",
          },
          {
            name: "vacation period (168 hours)",
            value: "168",
          },
        ],
      },
      {
        type: "select",
        placeholder: "Building air permeability",
        value: state.bAir,
        name: "bAir",
        options: (function () {
          if (Number(state.disusePeriod) === 168) {
            return [
              {
                name: "-",
                value: "-",
              },
            ];
          } else {
            return [
              {
                name: "low",
                value: "low",
              },
              {
                name: "high",
                value: "high",
              },
            ];
          }
        })(),
      },
      {
        type: "select",
        placeholder: "Building mass",
        value: state.bMass,
        name: "bMass",
        options: [
          {
            name: "low",
            value: "low",
          },
          {
            name: "high",
            value: "high",
          },
        ],
      },
      {
        type: "select",
        placeholder: "Reheat time [h]",
        value: state.reheatTime,
        name: "reheatTime",
        options: [
          {
            name: "0.5",
            value: "0.5",
          },
          {
            name: "1",
            value: "1",
          },
          {
            name: "2",
            value: "2",
          },
          {
            name: "3",
            value: "3",
          },
          {
            name: "4",
            value: "4",
          },
          {
            name: "6",
            value: "6",
          },
          {
            name: "12",
            value: "12",
          },
        ],
      },
    ];
  } else if (state.type === "Complex shaped room") {
    return [
      {
        type: "text",
        placeholder: "Name",
        value: state.name,
        name: "name",
      },
      {
        type: "select",
        placeholder: "Room type",
        value: state.type,
        name: "type",
        options: [
          {
            name: "Simple room",
            value: "Simple room",
          },
          {
            name: "Complex shaped room",
            value: "Complex shaped room",
          },
        ],
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Room temperature [°С]",
        value: state.roomT,
        name: "roomT",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Air exchange rate [AC/h]",
        value: state.airExRate,
        name: "airExRate",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Area [m²]",
        value: state.area,
        name: "area",
        step: 0.1,
      },
      {
        type: "number",
        subType: "number",
        placeholder: "Height [m]",
        value: state.height,
        name: "height",
        step: 0.1,
      },
      {
        type: "select",
        placeholder: "Period of disuse [h]",
        value: state.disusePeriod,
        name: "disusePeriod",
        options: [
          {
            name: "8 hours",
            value: "8",
          },
          {
            name: "11 hours",
            value: "11",
          },
          {
            name: "14 hours",
            value: "14",
          },
          {
            name: "weekend setback (62 hours)",
            value: "62",
          },
          {
            name: "vacation period (168 hours)",
            value: "168",
          },
        ],
      },
      {
        type: "select",
        placeholder: "Building air permeability",
        value: state.bAir,
        name: "bAir",
        options: (function () {
          if (Number(state.disusePeriod) === 168) {
            return [
              {
                name: "-",
                value: "-",
              },
            ];
          } else {
            return [
              {
                name: "low",
                value: "low",
              },
              {
                name: "high",
                value: "high",
              },
            ];
          }
        })(),
      },
      {
        type: "select",
        placeholder: "Building mass",
        value: state.bMass,
        name: "bMass",
        options: [
          {
            name: "low",
            value: "low",
          },
          {
            name: "high",
            value: "high",
          },
        ],
      },
      {
        type: "select",
        placeholder: "Reheat time [h]",
        value: state.reheatTime,
        name: "reheatTime",
        options: [
          {
            name: "0.5",
            value: "0.5",
          },
          {
            name: "1",
            value: "1",
          },
          {
            name: "2",
            value: "2",
          },
          {
            name: "3",
            value: "3",
          },
          {
            name: "4",
            value: "4",
          },
          {
            name: "6",
            value: "6",
          },
          {
            name: "12",
            value: "12",
          },
        ],
      },
    ];
  }
};
