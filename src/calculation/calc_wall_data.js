import { calc_group } from "./calc_group";
import { calc_ground_floor_heatLoss } from "./calc_ground_floor_heatLoss";

export const calc_wall_data = (obj, deltaT, bTypeValue) => {
  if (obj.exWallGroup === "ground floor") {
    const uValue = calc_ground_floor_heatLoss(
      obj.thickInsul,
      obj.expPerimeter,
      obj.area,
      obj.thermInsul
    );
    obj.uValue = uValue;
    obj.heatLoss = obj.uValue * obj.area * deltaT + bTypeValue;
    return;
  } else if (obj.exWallGroup === "roof") {
    console.log(obj);
    obj.area = obj.area - calc_group(obj.items, "area");
    // AND HEAT LOSS = HEAT LOSS + ALL HIS ITEMS HEAT LOSS
    obj.heatLoss = obj.uValue * obj.area * deltaT + bTypeValue;
    obj.heatLoss += calc_group(obj.items, "heatLoss");
    return;
  } else {
    obj.area = obj.height * obj.length;
    obj.area = obj.area - calc_group(obj.items, "area");

    if (obj.exWallGroup === "internall wall") {
      obj.heatLoss = obj.uValue * obj.area * obj.tempNroom + bTypeValue;
    } else {
      obj.heatLoss = obj.uValue * obj.area * deltaT + bTypeValue;
    }

    // AND HEAT LOSS = HEAT LOSS + ALL HIS ITEMS HEAT LOSS
    obj.heatLoss += calc_group(obj.items, "heatLoss");
  }
};
