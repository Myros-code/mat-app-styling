import { checkPrefData } from "../../../../../math";

export const getUi = (data) => {
  return data.map((el, id) => {
    return (
      <tr key={id}>
        <td className="card__label" colSpan="2">
          {el.name}
        </td>
        <td>{`${checkPrefData("prefData", el)}${el.unit}`}</td>
      </tr>
    );
  });
};
