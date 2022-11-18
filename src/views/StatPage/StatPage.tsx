import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import S from "./statPage.module.scss";
import axios from "axios";
import { pointsMock, serverURL } from "../../assets/requestMock";
import {
  anomaly_category_list,
  district_name_list,
  management_company_name_list,
} from "../../assets/filterLists";
import DatePicker from "react-datepicker";

const datePickerParams = {
  locale: "ru",
  wrapperClassName: S.datePicker__wrapper,
  className: S.datePicker,
};

const formatDate = (dt: Date | null): string => {
  return (
    dt?.getFullYear() +
    "-" +
    ((dt?.getMonth() || 0) < 10 ? "0" + dt?.getMonth() : dt?.getMonth()) +
    "-" +
    ((dt?.getDate() || 0) < 10 ? "0" + dt?.getDate() : dt?.getDate())
  );
};

const StatPage: React.FC = () => {
  const [graphArray, setGraphArray] = useState([1]);
  const [anomalyCategory, setAnomalyCategory] = useState<any>("");
  const [districtName, setDistrictName] = useState<any>("");
  const [managementCompanyName, setManagementCompanyName] = useState<any>("");
  const [points, setPoints] = useState<any>([]);
  const [openDate, setOpenDate] = useState<Date | null>(new Date());
  const [closeDate, setCloseDate] = useState<Date | null>(new Date());
  const addGraph = () => {
    setGraphArray([...graphArray, graphArray[graphArray.length - 1]]);
  };

  useEffect(() => {
    let today = new Date(Date.now());
    axios
      .get(
        serverURL +
          "statistic?" +
          "&district_name=" +
          (districtName !== "Все" ? districtName : "") +
          "&management_company_name=" +
          (managementCompanyName !== "Все" ? managementCompanyName : "") +
          "&anomaly_category_name=" +
          (anomalyCategory !== "Все" ? anomalyCategory : "") +
          "&opening_date=" +
          (formatDate(openDate) !== formatDate(new Date()) ? formatDate(openDate) : "") +
          "&closing_date=" +
          (formatDate(closeDate)  !== formatDate(new Date()) ? formatDate(closeDate) : "")
      )
      .then((response) => setPoints(response.data?.points))
      .catch(() => setPoints(pointsMock));
  }, [
    anomalyCategory,
    districtName,
    managementCompanyName,
    openDate,
    closeDate,
  ]);
  return (
    <div className={S.page__wrapper}>
      <div className={S.header}>
        <h2 className={S.title}>Статистика</h2>
      </div>
      <div className={S.content}>
        {graphArray.map((val, index) => (
          <>
            <h2>Доля ситуаций с аномалией</h2>
            <div className={S.graph}>
              <div className={S.graph__left}>
                <LineChart
                  width={window.innerWidth > 1200 ? 700 : 600}
                  height={460}
                  data={points}
                  margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip
                    wrapperStyle={{
                      borderColor: "white",
                      boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
                    }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#666666" }}
                  />
                  <Line
                    dataKey="percent"
                    type="monotone"
                    stroke="#ff7300"
                    dot={false}
                  />
                  <Brush dataKey="date" startIndex={0}>
                    <AreaChart>
                      <CartesianGrid />
                      <YAxis hide domain={["auto", "auto"]} />
                      <Area
                        dataKey="percent"
                        stroke="#ff7300"
                        fill="#ff7300"
                        dot={false}
                      />
                    </AreaChart>
                  </Brush>
                </LineChart>
              </div>
              <div className={S.graph__right}>
                <ul>
                  <li>
                    <label>Вид аномалии</label>
                    <select
                      value={anomalyCategory}
                      onChange={(e) => setAnomalyCategory(e.target.value)}
                    >
                      {anomaly_category_list.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <label>Период</label>
                    <DatePicker
                      selected={openDate}
                      startDate={openDate}
                      endDate={closeDate}
                      onChange={(dates) => {
                        const [start, end] = dates;
                        setOpenDate(start);
                        setCloseDate(end);
                      }}
                      dayClassName={(date: Date) =>
                        date.getDate() === openDate?.getDate() &&
                        date.getMonth() === openDate?.getMonth()
                          ? S.datePicker__day_selected
                          : S.datePicker__day
                      }
                      {...datePickerParams}
                      selectsRange
                    />
                  </li>
                  <li>
                    <label>Район</label>
                    <select
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                    >
                      {district_name_list.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <label>Управляющая компания</label>
                    <select
                      value={managementCompanyName}
                      onChange={(e) => setManagementCompanyName(e.target.value)}
                    >
                      {management_company_name_list.map((item) => (
                        <option>{item}</option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>
            </div>
            <div className={S.button__wrapper}>
              {index === graphArray.length - 1 ? (
                <input value="Добавить график" onClick={() => addGraph()} />
              ) : (
                ""
              )}
              <input className={S.button_accent} value="Распечатать график" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default StatPage;
