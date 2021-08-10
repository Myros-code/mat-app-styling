export const getFieldsData = (state) => {
  return [
    {
      type: "text",
      placeholder: "Name",
      value: state.name,
      name: "name",
    },
    {
      type: "select",
      placeholder: "Thermal Bridging",
      value: state.buildingType,
      name: "buildingType",
      options: [
        {
          name: "0.00 [W/ m²K]",
          value: 0,
        },
        {
          name: "0.02 [W/ m²K]",
          value: 0.02,
        },
        {
          name: "0.05 [W/m²K]",
          value: 0.05,
        },
        {
          name: "0.10 [W/ m²K]",
          value: 0.1,
        },
        {
          name: "0.15 [W/ m²K]",
          value: 0.15,
        },
      ],
    },
    {
      type: "number",
      placeholder: "Temp outside",
      value: state.outsideT,
      name: "outsideT",
    },
    {
      type: "number",
      placeholder: "Ground temp",
      value: state.groundT,
      name: "groundT",
    },
    {
      type: "number",
      placeholder: "Degree-days",
      value: state.dDays,
      name: "dDays",
    },
  ];
};
