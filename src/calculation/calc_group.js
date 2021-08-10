export const calc_group = (arr, groupName) => {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr.reduce((prev, cur) => {
      return Number(prev) + Number(cur[groupName]);
    }, 0);
  }
};
