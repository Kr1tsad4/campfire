import { useEffect, useRef } from "react";
import InputComponent from "./InputComponent";
import Calender from "./Calender";
import TimePicker from "./TimePicker";
import { useNavigate } from "react-router-dom";

function PartyForm({
  type,
  hideNavBar,
  loginUser,
  myParty,
  partyName,
  setPartyName,
  description,
  setDescription,
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  baseTags,
  setBaseTags,
  setSelectedTags,
  handleSelectedTag,
  createNewParty,
  enableCreateButton,
  fetchBaseTags,
  updateMyParty,
}) {
  const navigator = useNavigate();
  const isInitialized = useRef(false);

  useEffect(() => {
    fetchBaseTags();
  }, []);

  useEffect(() => {
    if (
      type === "update" &&
      myParty &&
      baseTags.length > 0 &&
      !isInitialized.current
    ) {
      isInitialized.current = true;
      setPartyName(myParty.name || "");
      setDescription(myParty.description || "");
      setSelectedDate(myParty.date || "");
      setStartTime(myParty.startTime || "");
      setEndTime(myParty.endTime || "");

      const updatedTags = baseTags.map((tag) => ({
        ...tag,
        selected: myParty.tags.includes(tag._id),
      }));
      setBaseTags(updatedTags);
      setSelectedTags(myParty.tags);
    }
  }, [myParty, type, baseTags]);

  return (
    <div
    // transition-all duration-300
      className={`flex flex-col text-black gap-3 pt-[88px] mt-6 mb-6   ${
        hideNavBar ? "ml-10 sm:ml-25 lg:ml-250 xl:ml-235" : "xl:ml-75 lg:ml-20 sm:ml-25 ml-10 "
      } `}
    >
      <div className="flex justify-start mb-5 ">
        {type === "create" && (
          <h1 className="text-[30px] font-bold">Create your party</h1>
        )}
        {type === "update" && (
          <h1 className="text-[30px] font-bold">Update party</h1>
        )}
      </div>
      <div className="flex flex-col items-center ">
        <label className="-ml-[410px] mb-2">
          Party Name {""}
          <span className="text-red-500">*</span>
        </label>
        <div className="max-[426px]:-ml-45 max-[321px]:-ml-75">
          <InputComponent
            id="party-name"
            type="text"
            placeholder="Enter party name"
            width="500"
            value={partyName}
            handleInput={(e) => setPartyName(e)}
          />
        </div>

        <label className="-ml-[420px] mb-2">Description</label>
        <div className="max-[426px]:-ml-45 max-[321px]:-ml-75">
          <InputComponent
            id="description"
            type="text"
            placeholder="Enter party description"
            width="500"
            value={description}
            handleInput={(e) => setDescription(e)}
          />
        </div>

        <label className="-ml-[420px] mb-2 ">
          Pick a date {""}
          <span className="text-red-500">*</span>
        </label>

        <Calender
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex w-[500px] gap-5 max-[426px]:flex-col max-[321px]:-ml-2">
          <TimePicker
            label="Start Time"
            selectedTime={startTime}
            setSelectedTime={setStartTime}
          />
          <TimePicker
            label="End Time"
            selectedTime={endTime}
            setSelectedTime={setEndTime}
          />
        </div>
        <label className="-ml-[390px] mb-2 max-[321px]:mr-12">Select party tags</label>

        <div className="flex self-start max-[321px]:-ml-5">
          {baseTags.map((tag, index) => {
            return (
              <div
                key={index}
                className={`mr-2 border-1 border-black rounded-[10px] px-2 py-[2px] text-[16px] cursor-default ${
                  baseTags[index].selected ? "bg-[#f4cdb8ff]" : ""
                }`}
                onClick={() => handleSelectedTag(index)}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
        <div className={`${type === "create" ? "ml-[420px]" : type === "update" ? "ml-[320px]" : ""} mt-5 max-[426px]:-ml-45 max-[321px]:-ml-70`}>
          {type === "create" && (
            <button
              onClick={() => createNewParty()}
              className={` ${
                enableCreateButton
                  ? "bg-[#f3bfa3] cursor-pointer hover:bg-[#f0b291]"
                  : "bg-[#ccc7c4]"
              } rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] `}
              disabled={!enableCreateButton}
            >
              Create
            </button>
          )}
          {type === "update" && (
            <div className="flex gap-2">
              <button
                onClick={() => navigator("/my-party")}
                className={`
            bg-[#f3bfa3] cursor-pointer hover:bg-[#f0b291]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] `}
              >
                cancel
              </button>

              <button
                onClick={() =>
                  updateMyParty(
                    {
                      name: partyName,
                      description,
                      date: selectedDate,
                      startTime,
                      endTime,
                      tags: baseTags
                        .filter((tag) => tag.selected)
                        .map((tag) => tag._id),
                    },
                    loginUser?._id,
                    myParty._id
                  )
                }
                className="bg-[#f3bfa3] cursor-pointer hover:bg-[#f0b291]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700]"
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartyForm;
