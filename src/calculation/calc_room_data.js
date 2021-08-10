import { calc_group } from "./calc_group";
import { calc_hight_ceiling } from "./calc_hight_ceiling";

export const calc_room_data = (obj, outsideT) => {
  const wallHeatLoss = calc_group(obj.items, "heatLoss");
  const areaAll = calc_group(obj.items, "area");

  obj.deltaT = obj.roomT - outsideT;

  if (obj.type === "Simple room") {
    obj.area = obj.width * obj["length"];
  }

  obj.roomVolume = obj.height * obj.area;
  obj.reheatPover = obj.area * obj.heatingPover;
  obj.airHeated = obj.roomVolume * obj.airExRate;
  obj.venHeatLoss = obj.airHeated * 0.33 * obj.deltaT;
  obj.transmissionLoss = wallHeatLoss;
  obj.hightCeilingF = calc_hight_ceiling(obj.height);
  obj.totalHeatLoss = Number(obj.venHeatLoss) + Number(wallHeatLoss);
  obj.ceilingHeatLoss = obj.hightCeilingF * obj.totalHeatLoss;
  obj.totalHeatLoss += obj.ceilingHeatLoss;
  console.log(obj.totalHeatLoss);
  console.log(obj.area);
  obj.specHeatLoss = obj.totalHeatLoss / obj.area;
  obj.totalWallArea = areaAll;
  obj.yearlyHeat = (obj.totalHeatLoss / obj.deltaT) * 24 * 2000;
};
