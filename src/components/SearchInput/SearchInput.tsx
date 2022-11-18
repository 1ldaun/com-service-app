import React, { Component } from "react";
import S from "./searchInput.module.scss";

const SearchInput: React.FC<{ actualSearch: string; setActualSearch: any }> = ({
  actualSearch,
  setActualSearch,
}) => {
  return (
    <span className={S.input_wrapper}>
      <input
        type="text"
        className={S.search}
        value={actualSearch}
        onChange={(e) => setActualSearch(e.target.value)}
      />
    </span>
  );
};

export default SearchInput;
