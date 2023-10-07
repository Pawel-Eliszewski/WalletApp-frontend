import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "./Calendar.css";

export const Calendar = ({
  transactionType,
  addTransactionDate,
  editTransactionDate,
  onChange,
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [addTransactionDate, editTransactionDate]);

  const calendarIncomeClass = transactionType === "income" ? " income" : "";

  return (
    <div className="calendarBox">
      <Datetime
        key={key}
        className={"calendar" + calendarIncomeClass}
        initialValue={addTransactionDate || editTransactionDate}
        onChange={(newDate) => onChange(newDate)}
        dateFormat="DD.MM.YYYY"
        timeFormat={false}
        closeOnSelect="true"
        inputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

Calendar.propTypes = {
  transactionType: PropTypes.string,
  addTransactionDate: PropTypes.string,
  editTransactionDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
