import { useState, useEffect } from "react";

function TimePicker({ label, selectedTime, setSelectedTime }) {
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];
  const periods = ["AM", "PM"];

  const [hour, setHour] = useState("-");
  const [minute, setMinute] = useState("-");
  const [period, setPeriod] = useState("AM");

  const handleChange = (h, m, p) => {
    setHour(h);
    setMinute(m);
    setPeriod(p);

    if (h !== "-" && m !== "-" && p) {
      const formatted = `${h}:${m} ${p}`;
      setSelectedTime(formatted);
    }
  };

  useEffect(() => {
    if (selectedTime) {
      const timeParts = selectedTime.trim().split(/[: ]/);
      if (timeParts.length === 3) {
        setHour(timeParts[0].padStart(2, "0"));
        setMinute(timeParts[1]);
        setPeriod(timeParts[2]);
      }
    }
  }, [selectedTime]);

  return (
    <div className="mb-4 w-[500px] max-[321px]:-ml-5">
      <label className="block font-medium mb-1">
        {label}
      </label>
      <div className="flex gap-2 max-[426px]:pl-4">
        <select
          value={hour}
          onChange={(e) => handleChange(e.target.value, minute, period)}
          className="border px-2 py-1 rounded"
        >
          <option value="-">Hour</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          value={minute}
          onChange={(e) => handleChange(hour, e.target.value, period)}
          className="border px-2 py-1 rounded"
        >
          <option value="-">Minute</option>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={period}
          onChange={(e) => handleChange(hour, minute, e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimePicker;
