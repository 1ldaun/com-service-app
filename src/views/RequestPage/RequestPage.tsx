import React, { useEffect, useState } from "react";
import S from "./requestPage.module.scss";
import Comment from "./Comment/Comment";
import axios from "axios";
import { infoMock, serverURL } from "../../assets/requestMock";
import { Link } from "react-router-dom";
import { anomaly_category_list } from "../../assets/filterLists";

const calcTimeDif = (a: string, b: string): Array<number> => {
  let timeDif =
    a && b
      ? new Date(
          parseInt(a.substring(0, 4)),
          (parseInt(a.substring(5, 7)) + 1) % 12,
          parseInt(a.substring(8, 10)),
          parseInt(a.substring(11, 13)),
          parseInt(a.substring(14, 16))
        ).getTime() -
        new Date(
          parseInt(b.substring(0, 4)),
          (parseInt(b.substring(5, 7)) + 1) % 12,
          parseInt(b.substring(8, 10)),
          parseInt(b.substring(11, 13)),
          parseInt(b.substring(14, 16))
        ).getTime()
      : 0;

  let daysDif = Math.floor(timeDif / 1000 / 60 / 60 / 24);
  let hoursDif = Math.floor(Math.floor((timeDif / 1000 / 60 / 60) % 24));
  let minutesDif = Math.floor(Math.floor((timeDif / 1000 / 60) % 60));

  return [daysDif, hoursDif, minutesDif];
};

const RequestPage: React.FC = () => {
  const [requestInfo, setRequestInfo] = useState<Array<any>>([]);
  const [date, setDate] = useState<Array<number>>([]);
  useEffect(() => {
    let loc = document.location.search;
    loc.substring(0, 3);
    axios
      .get(serverURL + "info" + loc)
      .then((response) => {
        setRequestInfo(response.data?.requests);
        setDate(
          calcTimeDif(
            response.data?.requests?.closing_date,
            response.data?.requests?.opening_date
          )
        );
      })
      .catch(() => setRequestInfo([infoMock]));
  }, []);

  return (
    <div className={S.page__wrapper}>
      <div className={S.header}>
        <Link to={"/monitoring"} className={S.close}>
          Назад
        </Link>
        <h2 className={S.title}>{requestInfo[0]?.fault_name}</h2>
      </div>
      <div className={S.content}>
        <div className={S.info}>
          <div className={S.info__top}>
            <div className={S.generalInfo}>
              <h2>Описание</h2>
              <h3>Время выполнения</h3>
              <p>
                {date[0] || 0}д {date[1] || 0}ч {date[2] || 0}мин
              </p>
              <h3>Адрес</h3>
              <p>{requestInfo[0]?.address}</p>
              <h3>Управляющая организация</h3>
              <p>{requestInfo[0]?.management_company_name}</p>
              <h3>Обслуживающая организация</h3>
              <p>{requestInfo[0]?.service_organization_name}</p>
            </div>
            <div className={S.abnormalBlock}>
              <h2>Аномалии</h2>
              <ul>
                <li>
                  {anomaly_category_list[requestInfo[0]?.anomaly_category + 1]}
                </li>
              </ul>
            </div>
          </div>
          <div className={S.info__bottom}>
            <h2>История</h2>
            <table>
              <tr>
                <th>Дата создания</th>
                <th>Время выполнения</th>
                <th>Результативность</th>
                <th>Вид работ</th>
                <th>Описание</th>
                <th></th>
              </tr>
              {requestInfo.map((item, index) => (
                <Comment item={item} key={index} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
