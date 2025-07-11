import { useState } from "react";

function TimePicker({ label, value, onChange }) {
  const [time, setTime] = useState(value || "");

  const handleChange = (e) => {
    const raw = e.target.value;
    setTime(raw);
    onChange?.(formatTime(raw));
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  };

  return (
    <div className="w-[500px] mb-5">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="time"
        value={time}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-400 rounded"
      />
    </div>
  );
}

export default TimePicker;
