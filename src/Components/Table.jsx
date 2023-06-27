import React from "react";
import { info } from "../data/info.js";
import { TableSection } from "./TableSection.jsx";

export const Table = () => {
  return (
    <table>
      <thead>
        <td></td>
        <th>Yksikkö</th>
        <th>Rahallinen arvo €</th>
      </thead>
      {info.map((yksikkoDetails, index) => (
        <TableSection yksikkoDetails={yksikkoDetails} index={index} />
      ))}
    </table>
  );
};
