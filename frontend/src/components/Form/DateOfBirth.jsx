import { useState } from "react";

function DateOfBirth({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
}) {
  const [daysInMonth, setDaysInMonth] = useState([]);

  const currentYear = new Date().getFullYear();
  const lengthYear = currentYear - 125;
  const years = [];
  for (let i = currentYear; i >= lengthYear; --i) {
    years.push(i);
  }

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const updateDays = (year, month) => {
    if (!year || !month) return;

    let days = 31;

    if (month === 2) {
      days = isLeapYear(year) ? 29 : 28;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      days = 30;
    }

    const daysArray = [];
    for (let i = days; i >= 1; --i) daysArray.push(i);
    setDaysInMonth(daysArray);
  };

  const handleYearChange = (eventObject) => {
    const year = parseInt(eventObject.target.value);
    setSelectedYear(year);
    updateDays(year, selectedMonth);
  };

  const handleMonthChange = (eventObject) => {
    const month = parseInt(eventObject.target.value);
    setSelectedMonth(month);
    updateDays(selectedYear, month);
  };
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="max-[426px]:flex max-[426px]:flex-col">
      {/* year */}
      <div className="text-[16px] text-gray-700 font-[500] mb-2">
        Date of birth
      </div>
      <select
        id="year"
        name="year"
        className="border border-gray-400 px-2 py-2 rounded-md w-28 mr-2"
        onClick={handleYearChange}
      >
        <option value="">-- Year --</option>
        {years.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      {/* month */}
      <select
        id="month"
        name="month"
        className={`border border-gray-400 px-2 py-2 rounded-md w-36 mr-2
        ${
          !selectedYear
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white"
        }`}
        disabled={!selectedYear}
        onClick={handleMonthChange}
      >
        <option value="">-- Month --</option>
        {months.map((month) => {
          return (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          );
        })}
      </select>

      {/* day */}
      <select
        id="day"
        name="day"
        className={`border border-gray-400 px-2 py-2 rounded-md w-26 mr-2
        ${
          !selectedYear || !selectedMonth
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white cursor-auto"
        }`}
        disabled={!selectedYear || !selectedMonth}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        <option value="">-- day --</option>
        {daysInMonth.map((day) => {
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default DateOfBirth;
