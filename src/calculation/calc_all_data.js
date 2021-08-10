// import { calc_wall_data } from "./calc_wall_data";
// import { calc_room_data } from "./calc_room_data";
// import { calc_group } from "./calc_group";
// import { useDispatch } from "react-redux";

// const calc_wall_item_data = (item) => {
//   return item;
// };

// export const calc_all_data = (state) => {
//   console.log(state);
//   return state;
// };

// export const calc_all_data_check = () => {
//   const data = [
//     {
//       name: "a",
//       value: 1,
//       dataAll: 0,
//       childrens: [
//         {
//           name: "aa",
//           dataAll: 0,
//           value: 11,
//           childrens: [
//             { value: 111, name: "aaa" },
//             { value: 112, name: "aab" },
//           ],
//         },
//         {
//           name: "ab",
//           value: 12,
//           dataAll: 0,
//           childrens: [
//             { value: 121, name: "aba" },
//             { value: 122, name: "abb" },
//           ],
//         },
//       ],
//     },
//     {
//       name: "b",
//       value: 2,
//       dataAll: 0,
//       childrens: [
//         {
//           name: "ba",
//           value: 21,
//           dataAll: 0,
//           childrens: [
//             { value: 211, name: "baa" },
//             { value: 212, name: "bab" },
//           ],
//         },
//         {
//           name: "bb",
//           value: 22,
//           dataAll: 0,
//           childrens: [
//             { value: 221, name: "bba" },
//             { value: 222, name: "bbb" },
//           ],
//         },
//       ],
//     },
//     {
//       name: "c",
//       value: 3,
//       dataAll: 0,
//       childrens: [
//         {
//           name: "ca",
//           value: 31,
//           dataAll: 0,
//           childrens: [
//             { value: 311, name: "caa" },
//             { value: 312, name: "cab" },
//           ],
//         },
//         {
//           name: "cb",
//           value: 32,
//           dataAll: 0,
//           childrens: [
//             { value: 321, name: "cba" },
//             { value: 322, name: "cbb" },
//           ],
//         },
//       ],
//     },
//   ];

//   data.forEach((el) => {
//     el.childrens.forEach((ch) => {
//       console.log(
//         "3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333"
//       );
//       console.log(ch);
//       ch.dataAll = ch.value + calc_group(ch.childrens, "value");
//       console.log(
//         `dataAll:${ch.dataAll} = ch.value:${ch.value} + group:${calc_group(
//           ch.childrens,
//           "value"
//         )}`
//       );
//       console.log(
//         "3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333"
//       );
//     });
//     el.dataAll = el.value + calc_group(el.childrens, "dataAll");
//   });
//   console.log(calc_group(data, "dataAll"));
// };
