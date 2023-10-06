import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import css from "./Calendar.module.css";

export const Calendar = ({
  addTransactionDate,
  editTransactionDate,
  onChange,
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [addTransactionDate, editTransactionDate]);

  return (
    <div className={css.calendarBox}>
      <Datetime
        key={key}
        className={css.calendar}
        initialValue={addTransactionDate || editTransactionDate}
        onChange={(newDate) => onChange(newDate)}
        dateFormat="DD.MM.YYYY"
        timeFormat={false}
        closeOnSelect="true"
      />
    </div>
  );
};

Calendar.propTypes = {
  addTransactionDate: PropTypes.string,
  editTransactionDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
