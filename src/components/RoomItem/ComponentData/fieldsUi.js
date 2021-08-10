import { checkPrefData, checkUnits } from "../../../math";

export const getFieldsUi = (data) => {
  return data.map((el, id) => {
    return (
      <tr key={id}>
        <td className="card__label" colSpan="2">
          {el.name}
        </td>
        <td>{`${checkPrefData("prefData", el)}${checkUnits("unit", el)}`}</td>
      </tr>
    );
  });
};
