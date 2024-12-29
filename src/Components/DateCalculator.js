import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import "../App.css";

const eventDates = {
  "new-year": { month: 0, day: 1 }, 
  "new-years-eve": { month: 11, day: 31 }, 
  easter: { month: 3, day: 31 },  
  thanksgiving: { month: 10, day: 28 }, 
  halloween: { month: 9, day: 31 }, 
  christmas: { month: 11, day: 25 }, 
};

const getNextOccurrence = (month, day) => {
  const now = dayjs();
  let eventDate = dayjs().set("month", month).set("date", day);
  if (eventDate.isBefore(now, "day")) {
    eventDate = eventDate.add(1, "year");
  }
  return eventDate;
};

const DateCalculator = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [includeAllDays, setIncludeAllDays] = useState(false);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [event, setEvent] = useState("");
  const [result, setResult] = useState("");
  const [otherunits, setOtherunits] = useState({});
  const handleEventChange = (event) => {
  const selectedEvent = event.target.value;
  setEvent(selectedEvent);
    if (eventDates[selectedEvent]) {
      const { month, day } = eventDates[selectedEvent];
      const nextOccurrence = getNextOccurrence(month, day);
      setEndDate(nextOccurrence);
    } 
    else {
      setEndDate(null); 
    }
  };

  const calculateDifference = () => {
    if (endDate) {
      const currentDate = startDate ? startDate : dayjs();
      let diffInDays = endDate.diff(currentDate, "day");
      if (includeEndDay) diffInDays += 1;
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = endDate.diff(currentDate, "month");
      const hoursPerDay = 24;
      const minutesPerHour = 60;
      const secondsPerMinute = 60;
      const hours = diffInDays * hoursPerDay;
      const minutes = hours * minutesPerHour;
      const seconds = minutes * secondsPerMinute;
      setOtherunits({
        days: diffInDays,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        months: diffInMonths,
        weeks: diffInWeeks,
        From: currentDate.format("dddd DD MMMM YYYY"),
        To: endDate.format("dddd DD MMMM YYYY"),
      });
      setResult("");
    } else {
      setResult("Please select the dates.");
    }
  };

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-calculator-container">
        <div className="card">
          <h2>Date Difference Calculator</h2>
                <div className="date-picker">
                    <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(dayjs(newValue))}
                    />
                </div>
                <div className="date-picker">
                    <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(dayjs(newValue))}
                    />
                </div>
          <div className="event-selection">
                <p>Event:</p>
                    <select
                    value={event}
                    onChange={handleEventChange}
                    className="event-select margin-0"
                    >
                        <option value="">Select an Event</option>
                        <option value="new-year">New Year</option>
                        <option value="new-years-eve">New Year's Eve</option>
                        <option value="easter">Easter</option>
                        <option value="thanksgiving">Thanksgiving</option>
                        <option value="halloween">Halloween</option>
                        <option value="christmas">Christmas</option>
                    </select>
          </div>
          <div className="switch-container">
            <div className="switch-item">
              <span>Include All Days</span>
                <Switch
                checked={includeAllDays}
                onChange={() => setIncludeAllDays(!includeAllDays)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#4caf50",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#4caf50",
                  },
                }}
                />
            </div>
            <div className="switch-item switch-item-1">
              <span>Include End Day</span>
                <Switch
                checked={includeEndDay}
                onChange={() => setIncludeEndDay(!includeEndDay)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#4caf50",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#4caf50",
                  },
                }}
                />
            </div>
        </div>
            <button
                className="calculator-button calculator-button-1"
                onClick={calculateDifference}
            >
                Calculate
            </button>
            {result.length > 0 && <p className="errorClass">{result}</p>}
        </div>
        {Object.keys(otherunits).length > 0 && (
          <div className="result-card">
            <p>From: {otherunits.From}</p>
            <p>To: {otherunits.To}</p>
            <p className="boldText">Result: {otherunits.days} days</p>
            <div>
              <h3>Alternative Units</h3>
              <p>{otherunits.days} day(s) can be converted to one of these units:</p>
              <p>{otherunits.months} month(s)</p>
              <p>{otherunits.weeks} week(s)</p>
              <p>{otherunits.hours} hour(s)</p>
              <p>{otherunits.minutes} minute(s)</p>
              <p>{otherunits.seconds} second(s)</p>
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default DateCalculator;
