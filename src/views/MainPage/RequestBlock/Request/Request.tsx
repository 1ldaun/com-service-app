import React, {useEffect, useState} from "react";
import S from "./request.module.scss";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import {serverURL} from "../../../../assets/requestMock";

const Request: React.FC<{
  minRequest?: boolean;
  anomaly: any;
  isActive?: boolean;
}> = ({ minRequest, anomaly, isActive }) => {
  const [number, setNumber] = useState(1);
  useEffect(() => {
    axios.get(serverURL + 'info?id=' + anomaly?.id).then((response) => setNumber(response.data?.requests?.length))
  }, [])
  return (
    <Link
      to={"/request?id=" + anomaly?.id}
      id={"anom" + anomaly?.id}
      className={classnames(
        S.request,
        minRequest ? S.minimal : "",
        isActive ? S.active : ""
      )}
    >
      <td>{number}</td>
      <td>{anomaly?.fault_name}</td>
      <td>{anomaly?.opening_date?.slice(0, 19)}</td>
      {!minRequest && <td>{anomaly?.management_company_name}</td>}
      {!minRequest && <td>{anomaly?.service_organization_name}</td>}
    </Link>
  );
};

export default Request;
