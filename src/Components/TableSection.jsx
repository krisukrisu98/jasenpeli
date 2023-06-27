import React from "react";
import { ExpendableButton } from "./ExpendableButton";
import { TableRow } from "./TableRow";
import useOpenController from "../Hooks/useOpenController";

export const TableSection = ({ yksikkoDetails, index }) => {
  const { isOpen, toggle } = useOpenController(false);

  let kokoTotal = 0;
  const calculateTotalPrice = () => {
    let total = 0;

    if (yksikkoDetails) {
      total = yksikkoDetails.raha1 + yksikkoDetails.raha2 + yksikkoDetails.raha3 + yksikkoDetails.raha4 + yksikkoDetails.raha5;
    }
    kokoTotal += total;
    return total;
  };

  return (
    <tbody>
      <tr>
        <td className="button-td">
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>
          <b>{yksikkoDetails.ylataso}</b>
        </td>
        <td>
          <b>{calculateTotalPrice()}</b>
        </td>
      </tr>
      {isOpen && <TableRow yksikkoDetails={yksikkoDetails} />}
    </tbody>
  );
};
