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

export const getFieldsDialogData = (state, buildingTypes, elementExternal) => {
  const constructionTypeOptions = get_construction_type_options(
    state.exWallGroup,
    buildingTypes,
    elementExternal
  );
  return constructionTypeOptions;
};
