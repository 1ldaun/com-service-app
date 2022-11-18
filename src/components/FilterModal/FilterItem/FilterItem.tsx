import React, { useState } from "react";
import S from "./filterItem.module.scss";

const FilterItem: React.FC<{
  children: string;
  selectedItems: any;
  setSelectedItems: any;
  index: number;
  activeFactor: number;
  actualSearch: string;
}> = ({
  children,
  selectedItems,
  setSelectedItems,
  index,
  activeFactor,
  actualSearch,
}) => {
  return (
    <li
      style={{
        display: children?.toLowerCase().includes(actualSearch.toLowerCase())
          ? "inline-block"
          : "none",
      }}
      onClick={() => {
        let copyArray = [...selectedItems];
        copyArray[activeFactor][index] = !selectedItems[activeFactor][index];
        setSelectedItems(copyArray);
      }}
      className={selectedItems[activeFactor][index] ? S.active : ""}
    >
      <input
        checked={selectedItems[activeFactor][index]}
        type="checkbox"
        className={S.customCheckbox}
      />
      <label className={S.label}>{children}</label>
    </li>
  );
};

export default FilterItem;
