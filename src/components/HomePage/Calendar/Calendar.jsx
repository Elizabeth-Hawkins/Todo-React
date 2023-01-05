import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { isSameMonth } from "date-fns";
import "react-day-picker/dist/style.css";
import '../../style/HomePage.css'

const Calendar = ({date, setDate}) => {
  const today = new Date();
  const [month, setMonth] = useState(new Date());

  return (
    <>
      <div className="calendar">
        <DayPicker
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={date}
          onSelect={setDate}
        />
      </div>
      <div>
        {!isSameMonth(today, month) && (
          <button className="today" onClick={() => setMonth(today)}>
            Today
          </button>
        )}
      </div>
    </>
  );
};

export default Calendar;
