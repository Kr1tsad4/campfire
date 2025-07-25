import { useRef, useEffect } from "react";
import "cally";

function Calender({ selectedDate, setSelectedDate }) {
  const calendarRef = useRef();

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const handleChange = () => {
      const value = calendarRef.current?.value;
      setSelectedDate(value);
    };

    calendarEl.addEventListener("change", handleChange);
    return () => {
      calendarEl.removeEventListener("change", handleChange);
    };
  }, [setSelectedDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <button
        popoverTarget="cally-popover1"
        id="cally1"
        className="input input-bordered border-gray-400 text-base text-gray-500 bg-transparent w-[500px] max-[600px]:w-[300px] max-[426px]:w-[300px] max-[321px]:w-[260px] mb-5 px-2 py-2"
        style={{ anchorName: "--cally1" }}
      >
        {selectedDate || "Select date"}
      </button>

      <div
        popover=""
        id="cally-popover1"
        className="dropdown rounded-box shadow-lg bg-[#63b77fff]"
        style={{ positionAnchor: "--cally1" }}
      >
        <calendar-date
          ref={calendarRef}
          class="cally"
          value={selectedDate}
          min={today}
        >
          <svg
            aria-label="Previous"
            className="fill-current size-4"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next"
            className="fill-current size-4"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>
  );
}

export default Calender;
