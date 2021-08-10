export const validateNumbers = (e) => {
  e.target.value = e.target.value.replace(/,/, ".");
  if (
    e.target.hasAttribute("subtype") &&
    e.target.getAttribute("subtype") === "number"
  ) {
    let matches = e.target.value.match(/^-?\d+\.?\d*$/) || [];
    if (!matches.length) {
      if (e.target.value === "-") {
      } else {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
      }
    }
  }
};

export const checkUnits = (unit) => {
  if (unit === "") {
    return "";
  } else {
    return `[${unit}]`;
  }
};
