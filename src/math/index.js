export function toSiPrefix(value, decimals, prefix) {
  // decimals should be a number,
  // if prefix is given, it will be rounded to a fixed number of decimals
  // if no prefix is given, it will be rounded to signifficant decimals
  // prefix should be one of standard SI Prefix: n, μ, m, k, M, G

  let cb = {};
  var lowerDecimals, upperDecimals, breakDecimals; // these are the standard values for the nice rounding

  if (typeof value === "string") {
    value = Number(value);
  }

  if (typeof decimals === "string") {
    decimals = Number(decimals);
  }

  if (prefix === undefined) {
    if (decimals === undefined) {
      lowerDecimals = 4;
      upperDecimals = 3;
      breakDecimals = 2;
    } else {
      lowerDecimals = decimals;
      upperDecimals = decimals - 1;
      breakDecimals = 2;
    }

    console.log(lowerDecimals, upperDecimals, value);

    if (value <= 1e-9) {
      cb.value = 0;
    }

    if (value < 1e-6) {
      cb.value = value * 1e9;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "n";
      if (value === 0) {
        cb.prefix = "";
        cb.value = 0;
      }
      cb.factor = 1e-9;
    }

    if (value >= 1e-6 && value < breakDecimals * 1e-6) {
      cb.value = value * 1e9;
      cb.value = cb.value.toPrecision(upperDecimals);
      cb.prefix = "n";
      cb.factor = 1e-9;
    }

    if (value >= breakDecimals * 1e-6 && value < 1e-3) {
      cb.value = value * 1e6;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "μ";
      cb.factor = 1e-6;
    }

    if (value >= 1e-6 && value < breakDecimals * 1e-3) {
      cb.value = value * 1e6;
      cb.value = cb.value.toPrecision(upperDecimals);
      cb.prefix = "μ";
      cb.factor = 1e-6;
    }

    if (value >= breakDecimals * 1e-3 && value < 1) {
      // cb.value = value * 1e3;
      // cb.value = cb.value.toPrecision( lowerDecimals );
      // cb.prefix = "m";
      // cb.factor = 1e-3;
      cb.value = value;
      cb.prefix = "";
    }

    if (Number(value) === 1) {
      cb.value = value;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "";
      cb.factor = 1;
    }

    if (value > 1 && value < breakDecimals * 1) {
      cb.value = value * 1;
      cb.value = cb.value.toPrecision(upperDecimals);
      cb.prefix = "";
      cb.factor = 1e-3;
    }

    if (value >= breakDecimals * 1 && value < 1e3) {
      cb.value = value * 1;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "";
      cb.factor = 1;
    }

    if (value >= 1e3 && value < breakDecimals * 1e3) {
      cb.value = value * 1;
      cb.value = cb.value.toPrecision(upperDecimals);
      cb.prefix = "";
      cb.factor = 1;
    }

    if (value >= breakDecimals * 1e3 && value < 1e6) {
      cb.value = value * 1e-3;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "k";
      cb.factor = 1e3;
    }

    if (value >= 1e6 && value < breakDecimals * 1e6) {
      cb.value = value * 1e-3;
      cb.value = cb.value.toPrecision(upperDecimals);
      cb.prefix = "k";
      cb.factor = 1e3;
    }

    if (value >= breakDecimals * 1e6) {
      cb.value = value * 1e-6;
      cb.value = cb.value.toPrecision(lowerDecimals);
      cb.prefix = "M";
      cb.factor = 1e6;
    }

    if (value > 1e12) {
      cb.value = Infinity;
    }
  }

  if (prefix !== undefined) {
    switch (String(prefix)) {
      case "n":
        cb.factor = 1e-9;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "μ":
        cb.factor = 1e-6;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "m":
        cb.factor = 1e-3;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "d":
        cb.factor = 10;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "h":
        cb.factor = 100;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "k":
        cb.factor = 1000;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      case "M":
        cb.factor = 1e6;
        cb.value = value / cb.factor;
        cb.value = cb.value.toFixed(decimals);
        cb.prefix = prefix;
        break;
      default:
        cb.factor = 1;
        cb.value = value;
        cb.prefix = "";
        console.log("WARNING: Unknown prefix: " + prefix);
    }
  }

  return cb;
}

var a = 123445.44556432345;
var b = 4;
var c = "M";

console.log(toSiPrefix(a, b, c));

export const checkPrefData = (key, obj) => {
  if (key in obj) {
    return `${Number(obj.prefData.value).toFixed(2)} ${obj.prefData.prefix}`;
  } else {
    return obj.value;
  }
};

export const checkUnits = (key, obj) => {
  if (key in obj) {
    return `${obj.unit}`;
  } else {
    return "";
  }
};
