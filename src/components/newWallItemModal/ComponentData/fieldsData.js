export const get_construction_type_options = (group_0, items, externalWall) => {
  //safe for ground floor bug
  if (group_0 === "ground floor") {
    return;
  }

  // files that sort with group 0
  const items_group_0 = items.filter((el) => {
    return el.group_0 === group_0 && el.external === externalWall;
  });

  // unique files that sort with group 1, need for generating options
  const options_group_1 = Object.values(
    items_group_0.reduce((c, e) => {
      if (!c[e.group_1]) c[e.group_1] = e;
      return c;
    }, {})
  );

  const options_group_1_clear = options_group_1.map((el) => {
    return {
      option: el.group_1,
      img: el.file,
      name: el.name,
    };
  });

  return options_group_1_clear;
};

export const get_variant_building_options = (
  group_0,
  group_1,
  items,
  externalWall
) => {
  //safe for ground floor bug
  if (group_0 === "ground floor") {
    return;
  }

  const options_group_2 = items.filter((el) => {
    return (
      el.group_0 === group_0 &&
      el.group_1 === group_1 &&
      el.external === externalWall
    );
  });

  const options_group_2_clear = options_group_2.map((el) => {
    return {
      name: el.group_2,
    };
  });

  return options_group_2_clear;
};

export const getFieldsData = (state, buildingTypes, elementExternal) => {
  const constructionTypeOptions = get_construction_type_options(
    state.exWallGroup,
    buildingTypes,
    elementExternal
  );
  
  const variantBuildingOptions = get_variant_building_options(
    state.exWallGroup,
    state.exWallGroup1,
    buildingTypes,
    elementExternal
  );

  return [
    {
      type: "text",
      placeholder: "Name",
      value: state.name,
      name: "name",
    },
    {
      type: "number",
      placeholder: "Width [m]",
      value: state.width,
      name: "width",
      step: 0.1,
    },
    {
      type: "number",
      placeholder: "Height [m]",
      value: state.height,
      name: "height",
      step: 0.1,
    },
    {
      type: "select",
      placeholder: "Type",
      value: state.exWallGroup,
      name: "exWallGroup",
      options: [
        {
          name: "window",
          value: "",
        },
        {
          name: "door",
          value: "",
        },
      ],
    },
    {
      type: "dropdown",
      placeholder: "Construction type",
      value: state.exWallGroup1,
      name: "exWallGroup1",
      items: constructionTypeOptions,
    },
    {
      type: "select",
      placeholder: "Variant",
      value: state.exWallGroup2,
      name: "exWallGroup2",
      options: variantBuildingOptions,
    },
    {
      type: "number",
      placeholder: "U-value [W/m²K]",
      value: state.uValue,
      name: "uValue",
      step: 0.1,
    },
  ];
};
