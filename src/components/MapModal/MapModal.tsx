import React, { useEffect, useState } from "react";
import S from "./mapModal.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import CustomMap from "../CustomMap/CustomMap";
import Request from "../../views/MainPage/RequestBlock/Request/Request";

const MapModal: React.FC<{
  setActive: any;
  setFilterActive: any;
  anomalies: Array<any>;
  actualSearch: string;
  setActualSearch: any;
}> = ({
  setActive,
  setFilterActive,
  anomalies,
  actualSearch,
  setActualSearch,
}) => {
  const [activePoint, setActivePoint] = useState<any>();

  useEffect(() => {
    let elem = document.getElementById("anom" + activePoint);
    elem?.scrollIntoView();
    let topPos = elem?.offsetTop;
    if (document.getElementById("list") && topPos) {
      (document.getElementById("list") || new HTMLElement()).scrollTop =
        topPos - 30;
    }
  }, [activePoint]);

  return (
    <div id={"map-modal"} className={S.modal__wrapper}>
      <div className={S.close} onClick={() => setActive(false)}>
        К списку заявок
      </div>
      <div className={S.modal}>
        <div className={S.header}>
          <div className={S.title}>
            <h2 className={S.title__header}>Поиск по карте</h2>
          </div>
          <div className={S.header__wrapper}>
            <SearchInput
              actualSearch={actualSearch}
              setActualSearch={setActualSearch}
            />
            <div className={S.sort} onClick={() => setFilterActive(true)}></div>
          </div>
        </div>
        <CustomMap anomalies={anomalies} setActivePoint={setActivePoint} activePoint={activePoint} />
        <div id={"list"} className={S.requestList}>
          <table className={S.requestBlock}>
            <th className={S.header}>
              <td>Количество заявок</td>
              <td>Наименование</td>
              <td>Дата создания</td>
            </th>
            {anomalies
              .filter((item) =>
                item?.fault_name
                  .toLowerCase()
                  .includes(actualSearch.toLowerCase())
              )
              .map((item) => (
                <Request
                  minRequest={true}
                  anomaly={item}
                  isActive={activePoint === item?.id}
                />
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
