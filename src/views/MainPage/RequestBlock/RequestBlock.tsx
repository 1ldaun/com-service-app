import React, {Component} from 'react';
import Request from "./Request/Request";
import S from './requestBlock.module.scss'

const RequestBlock: React.FC<{anomalies: Array<any>}> = ({anomalies}) => {
        return (
            <table className={S.requestBlock}>
                <th className={S.header}>
                    <td>Количество заявок</td>
                    <td>Наименование</td>
                    <td>Дата создания</td>
                    <td>Управляющая копания</td>
                    <td>Обслуживающая организация</td>
                </th>
                {anomalies?.map((item: any) => (
                    <Request minRequest={false} anomaly={item}/>
                ))}
            </table>
        );
}

export default RequestBlock;
