import React, {useState} from "react";
import S from "./comment.module.scss";

const Comment: React.FC<{item: any}> = ({item}) => {
    const [fb, setFb] = useState(false);
    const setFeedbackActive = () => {
        setFb(true);
        setTimeout(() => {
            setFb(false)
        }, 4000)
    }
  return (
    <tr className={S.comment}>
      <td className={S.date}>{item?.opening_date?.slice(0, 19)}</td>
      <td>{item?.closing_date?.slice(0, 19)}</td>
      <td>{item?.effectiveness}</td>
      <td>-</td>
      <td>{item?.fault_name}</td>
      <td className={`${S.review} ${item?.feedback ? S.active : ''}`} onClick={() => setFeedbackActive()}>Смотреть отзывы</td>
        <div className={`${S.popup} ${fb ? S.active : ''}`}>{item?.feedback}</div>
    </tr>
  );
};

export default Comment;
