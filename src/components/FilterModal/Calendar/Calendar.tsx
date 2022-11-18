import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import S from "./calendar.module.scss";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const Calendar: React.FC<{
  openStartDate: Date | null;
  setOpenStartDate: any;
  openEndDate: Date | null;
  setOpenEndDate: any;
  closeStartDate: Date | null;
  setCloseStartDate: any;
  closeEndDate: Date | null;
  setCloseEndDate: any;
}> = ({
  openStartDate,
  setOpenStartDate,
  openEndDate,
  setOpenEndDate,
  closeStartDate,
  setCloseStartDate,
  closeEndDate,
  setCloseEndDate,
}) => {
  const datePickerParams = {
    locale: "ru",
    wrapperClassName: S.datePicker__wrapper,
    className: S.datePicker,
  };

  return (
    <div className={S.date}>
      <div className={S.date__open}>
        <p>Дата создания заявки</p>
        <div className={S.date__block}>
          <DatePicker
            selected={openStartDate}
            onChange={(date) => setOpenStartDate(date)}
            dayClassName={(date: Date) =>
              date.getDate() === openStartDate?.getDate() &&
              date.getMonth() === openStartDate?.getMonth()
                ? S.datePicker__day_selected
                : S.datePicker__day
            }
            {...datePickerParams}
          />
          <div className={S.separator}></div>
          <DatePicker
            selected={openEndDate}
            onChange={(date) => setOpenEndDate(date)}
            dayClassName={(date: Date) =>
              date.getDate() === openEndDate?.getDate() &&
              date.getMonth() === openEndDate?.getMonth()
                ? S.datePicker__day_selected
                : S.datePicker__day
            }
            {...datePickerParams}
          />
        </div>
      </div>
      <div className={S.date__close}>
        <p>Дата закрытия заявки</p>
        <div className={S.date__block}>
          <DatePicker
            selected={closeStartDate}
            onChange={(date) => setCloseStartDate(date)}
            dayClassName={(date: Date) =>
              date.getDate() === closeStartDate?.getDate() &&
              date.getMonth() === closeStartDate?.getMonth()
                ? S.datePicker__day_selected
                : S.datePicker__day
            }
            {...datePickerParams}
          />
          <div className={S.separator}></div>
          <DatePicker
            selected={closeEndDate}
            onChange={(date) => setCloseEndDate(date)}
            dayClassName={(date: Date) =>
              date.getDate() === closeEndDate?.getDate() &&
              date.getMonth() === closeEndDate?.getMonth()
                ? S.datePicker__day_selected
                : S.datePicker__day
            }
            {...datePickerParams}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
