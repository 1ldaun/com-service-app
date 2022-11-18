import React, { useEffect, useState } from "react";
import S from "./filterModal.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import FilterItem from "./FilterItem/FilterItem";
import Calendar from "./Calendar/Calendar";
import {
  anomaly_category_list,
  district_name_list,
  management_company_name_list,
  service_organization_name_list,
  urgency_category_list,
} from "../../assets/filterLists";

const factorsList = [
  // "Адрес дома",
  "Управляющая компания",
  "Район",
  "Дата создания/закрытия заявки",
  "Обслуживающая организация",
  "Категория срочности",
  // "Вид аномалии",
];

const FilterModal: React.FC<{
  setActive: any;
  selectedItems: any;
  setSelectedItems: any;
  openStartDate: Date | null;
  setOpenStartDate: any;
  openEndDate: Date | null;
  setOpenEndDate: any;
  closeStartDate: Date | null;
  setCloseStartDate: any;
  closeEndDate: Date | null;
  setCloseEndDate: any;
}> = ({
  setActive,
  selectedItems,
  setSelectedItems,
  openStartDate,
  setOpenStartDate,
  openEndDate,
  setOpenEndDate,
  closeStartDate,
  setCloseStartDate,
  closeEndDate,
  setCloseEndDate,
}) => {
  const [activeFactor, setActiveFactor] = useState(0);
  const [actualSearch, setActualSearch] = useState("");
  const [factorList, setFactorList] = useState<Array<string>>([]);

  useEffect(() => {
    switch (activeFactor) {
      case 0:
        setFactorList(management_company_name_list);
        break;
      case 1:
        setFactorList(district_name_list);
        break;
      case 2:
        break;
      case 3:
        setFactorList(service_organization_name_list);
        break;
      case 4:
        setFactorList(urgency_category_list);
        break;
      case 5:
        setFactorList(anomaly_category_list);
        break;
    }
  }, [activeFactor]);

  useEffect(() => {}, []);

  return (
    <div className={S.modal_wrapper}>
      <div className={S.close} onClick={() => setActive(false)}>
        Закрыть
      </div>
      <div className={S.modal}>
        <div className={S.modal__left}>
          {activeFactor !== 2 ? (
            <SearchInput
              actualSearch={actualSearch}
              setActualSearch={setActualSearch}
            />
          ) : (
            <></>
          )}
          {activeFactor === 2 ? (
            <Calendar
              openStartDate={openStartDate}
              setOpenStartDate={setOpenStartDate}
              openEndDate={openEndDate}
              setOpenEndDate={setOpenEndDate}
              closeStartDate={closeStartDate}
              setCloseStartDate={setCloseStartDate}
              closeEndDate={closeEndDate}
              setCloseEndDate={setCloseEndDate}
            />
          ) : (
            <ul className={S.filterList}>
              {factorList.map((item, index) => (
                <FilterItem
                  activeFactor={activeFactor}
                  selectedItems={selectedItems}
                  index={index}
                  setSelectedItems={setSelectedItems}
                  actualSearch={actualSearch}
                >
                  {item}
                </FilterItem>
              ))}
            </ul>
          )}
        </div>
        <div className={S.modal__right}>
          <h3>Отфильтровать по</h3>
          <ul className={S.filterFactors}>
            {factorsList.map((factor, index) => {
              return (
                <li
                  id={index.toString()}
                  onClick={() => setActiveFactor(index)}
                  className={index === activeFactor ? S.active : ""}
                >
                  {factor}
                </li>
              );
            })}
          </ul>
          <input
            type="button"
            value="Применить"
            onClick={() => setActive(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
